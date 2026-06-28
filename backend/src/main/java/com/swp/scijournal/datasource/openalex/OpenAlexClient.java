package com.swp.scijournal.datasource.openalex;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.swp.scijournal.datasource.dto.ExternalPaperRecord;
import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class OpenAlexClient {

    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;
    private final String query;
    private final int perPage;

    public OpenAlexClient(
        ObjectMapper objectMapper,
        @Value("${app.sync.openalex.query:artificial intelligence}") String query,
        @Value("${app.sync.openalex.per-page:10}") int perPage
    ) {
        this.httpClient = HttpClient.newHttpClient();
        this.objectMapper = objectMapper;
        this.query = query;
        this.perPage = perPage;
    }

    public List<ExternalPaperRecord> fetchLatestRecords() {
        String encodedQuery = URLEncoder.encode(query, StandardCharsets.UTF_8);
        String url = "https://api.openalex.org/works?search=" + encodedQuery + "&per-page=" + perPage;

        HttpRequest request = HttpRequest.newBuilder(URI.create(url))
            .header("Accept", "application/json")
            .header("User-Agent", "ScientificJournalTracker/1.0")
            .GET()
            .build();

        try {
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() < 200 || response.statusCode() >= 300) {
                throw new IllegalStateException("OpenAlex API returned status " + response.statusCode());
            }

            JsonNode root = objectMapper.readTree(response.body());
            JsonNode results = root.path("results");
            if (!results.isArray()) {
                return List.of();
            }

            List<ExternalPaperRecord> records = new ArrayList<>();
            for (JsonNode result : results) {
                ExternalPaperRecord record = mapRecord(result);
                if (record != null) {
                    records.add(record);
                }
            }
            return records;
        } catch (IOException | InterruptedException exception) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Failed to fetch records from OpenAlex.", exception);
        }
    }

    private ExternalPaperRecord mapRecord(JsonNode result) {
        String sourcePaperId = extractLastSegment(result.path("id").asText(null));
        String title = firstNonBlank(result.path("title").asText(null), result.path("display_name").asText(null));
        Integer publicationYear = result.path("publication_year").isInt() ? result.path("publication_year").asInt() : null;

        if (sourcePaperId == null || title == null || publicationYear == null) {
            return null;
        }

        return new ExternalPaperRecord(
            "OpenAlex",
            sourcePaperId,
            title,
            extractAbstract(result),
            publicationYear,
            parseLocalDate(result.path("publication_date").asText(null)),
            normalizeDoi(result.path("doi").asText(null)),
            nullIfBlank(result.path("language").asText(null)),
            nullIfBlank(result.path("type").asText(null)),
            extractUrl(result),
            result.path("cited_by_count").isInt() ? result.path("cited_by_count").asInt() : 0,
            extractJournalName(result),
            extractAuthors(result.path("authorships")),
            extractNames(result.path("keywords")),
            extractNames(result.path("topics"))
        );
    }

    private String extractAbstract(JsonNode result) {
        JsonNode abstractNode = result.path("abstract_inverted_index");
        if (!abstractNode.isObject() || abstractNode.isEmpty()) {
            return "No abstract available.";
        }

        int maxIndex = -1;
        for (JsonNode positions : iterable(abstractNode)) {
            if (positions.isArray()) {
                for (JsonNode position : positions) {
                    maxIndex = Math.max(maxIndex, position.asInt(-1));
                }
            }
        }

        if (maxIndex < 0) {
            return "No abstract available.";
        }

        String[] words = new String[maxIndex + 1];
        abstractNode.fields().forEachRemaining(entry -> {
            for (JsonNode position : entry.getValue()) {
                int index = position.asInt(-1);
                if (index >= 0 && index < words.length) {
                    words[index] = entry.getKey();
                }
            }
        });

        StringBuilder builder = new StringBuilder();
        for (String word : words) {
            if (word == null || word.isBlank()) {
                continue;
            }
            if (builder.length() > 0) {
                builder.append(' ');
            }
            builder.append(word);
        }

        String abstractText = builder.toString().trim();
        return abstractText.isEmpty() ? "No abstract available." : truncate(abstractText, 3900);
    }

    private String extractJournalName(JsonNode result) {
        return firstNonBlank(
            result.path("primary_location").path("source").path("display_name").asText(null),
            "Unknown Journal"
        );
    }

    private String extractUrl(JsonNode result) {
        return firstNonBlank(
            result.path("primary_location").path("landing_page_url").asText(null),
            result.path("best_oa_location").path("landing_page_url").asText(null)
        );
    }

    private List<String> extractAuthors(JsonNode authorships) {
        if (!authorships.isArray()) {
            return List.of();
        }

        List<String> authors = new ArrayList<>();
        for (JsonNode authorship : authorships) {
            String name = nullIfBlank(authorship.path("author").path("display_name").asText(null));
            if (name != null && !authors.contains(name)) {
                authors.add(name);
            }
        }
        return authors;
    }

    private List<String> extractNames(JsonNode items) {
        if (!items.isArray()) {
            return List.of();
        }

        List<String> names = new ArrayList<>();
        for (JsonNode item : items) {
            String name = nullIfBlank(item.path("display_name").asText(null));
            if (name != null && !names.contains(name)) {
                names.add(name);
            }
            if (names.size() >= 8) {
                break;
            }
        }
        return names;
    }

    private LocalDate parseLocalDate(String value) {
        try {
            return value == null || value.isBlank() ? null : LocalDate.parse(value);
        } catch (Exception exception) {
            return null;
        }
    }

    private String normalizeDoi(String doi) {
        if (doi == null || doi.isBlank()) {
            return null;
        }
        return doi.replace("https://doi.org/", "").trim();
    }

    private String extractLastSegment(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        int lastSlash = value.lastIndexOf('/');
        return lastSlash >= 0 ? value.substring(lastSlash + 1) : value;
    }

    private String firstNonBlank(String... values) {
        for (String value : values) {
            String normalized = nullIfBlank(value);
            if (normalized != null) {
                return normalized;
            }
        }
        return null;
    }

    private String nullIfBlank(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }

    private String truncate(String value, int maxLength) {
        if (value.length() <= maxLength) {
            return value;
        }
        return value.substring(0, maxLength);
    }

    private Iterable<JsonNode> iterable(JsonNode node) {
        return node == null ? Collections::emptyIterator : node::elements;
    }
}
