package com.swp.scijournal.sync.service;

import com.swp.scijournal.datasource.dto.ExternalPaperRecord;
import com.swp.scijournal.datasource.entity.ApiDataSource;
import com.swp.scijournal.datasource.openalex.OpenAlexClient;
import com.swp.scijournal.datasource.repository.ApiDataSourceRepository;
import com.swp.scijournal.paper.entity.Author;
import com.swp.scijournal.paper.entity.Journal;
import com.swp.scijournal.paper.entity.Keyword;
import com.swp.scijournal.paper.entity.ResearchPaper;
import com.swp.scijournal.paper.entity.ResearchTopic;
import com.swp.scijournal.paper.repository.AuthorRepository;
import com.swp.scijournal.paper.repository.JournalRepository;
import com.swp.scijournal.paper.repository.KeywordRepository;
import com.swp.scijournal.paper.repository.ResearchPaperRepository;
import com.swp.scijournal.paper.repository.ResearchTopicRepository;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SyncService {

    private final ApiDataSourceRepository apiDataSourceRepository;
    private final OpenAlexClient openAlexClient;
    private final ResearchPaperRepository researchPaperRepository;
    private final JournalRepository journalRepository;
    private final AuthorRepository authorRepository;
    private final KeywordRepository keywordRepository;
    private final ResearchTopicRepository researchTopicRepository;

    public SyncService(
        ApiDataSourceRepository apiDataSourceRepository,
        OpenAlexClient openAlexClient,
        ResearchPaperRepository researchPaperRepository,
        JournalRepository journalRepository,
        AuthorRepository authorRepository,
        KeywordRepository keywordRepository,
        ResearchTopicRepository researchTopicRepository
    ) {
        this.apiDataSourceRepository = apiDataSourceRepository;
        this.openAlexClient = openAlexClient;
        this.researchPaperRepository = researchPaperRepository;
        this.journalRepository = journalRepository;
        this.authorRepository = authorRepository;
        this.keywordRepository = keywordRepository;
        this.researchTopicRepository = researchTopicRepository;
    }

    @Transactional
    public String runManualSync() {
        List<ApiDataSource> activeSources = apiDataSourceRepository.findByActiveTrueOrderBySourceNameAsc();
        int importedRecords = 0;
        int syncedSources = 0;
        int skippedSources = 0;

        for (ApiDataSource source : activeSources) {
            if (!"OpenAlex".equalsIgnoreCase(source.getSourceName())) {
                skippedSources++;
                continue;
            }

            List<ExternalPaperRecord> records = openAlexClient.fetchLatestRecords();
            for (ExternalPaperRecord record : records) {
                upsertPaper(record);
            }

            source.setLastSyncAt(Instant.now());
            apiDataSourceRepository.save(source);
            importedRecords += records.size();
            syncedSources++;
        }

        return "Đã đồng bộ " + importedRecords + " bản ghi từ " + syncedSources
            + " nguồn dữ liệu. Bỏ qua " + skippedSources + " nguồn chưa tích hợp.";
    }

    private void upsertPaper(ExternalPaperRecord record) {
        ResearchPaper paper = researchPaperRepository
            .findBySourceNameIgnoreCaseAndSourcePaperId(record.sourceName(), record.sourcePaperId())
            .orElseGet(ResearchPaper::new);

        paper.setSourceName(record.sourceName());
        paper.setSourcePaperId(record.sourcePaperId());
        paper.setTitle(record.title());
        paper.setAbstractText(defaultText(record.abstractText(), "No abstract available."));
        paper.setPublicationYear(record.publicationYear());
        paper.setPublicationDate(record.publicationDate());
        paper.setDoi(record.doi());
        paper.setLanguage(record.language());
        paper.setDocumentType(record.documentType());
        paper.setUrl(record.url());
        paper.setCitationCount(record.citationCount() == null ? 0 : record.citationCount());
        paper.setJournal(resolveJournal(record.journal()));
        paper.setAuthors(resolveAuthors(record.authors()));
        paper.setKeywords(resolveKeywords(record.keywords()));
        paper.setTopics(resolveTopics(record.topics()));

        researchPaperRepository.save(paper);
    }

    private Journal resolveJournal(String journalName) {
        String normalizedName = defaultText(journalName, "Unknown Journal");
        return journalRepository.findByNameIgnoreCase(normalizedName).orElseGet(() -> {
            Journal journal = new Journal();
            journal.setName(normalizedName);
            journal.setPublisher("OpenAlex");
            journal.setSubjectArea("Academic Research");
            journal.setCountry("Unknown");
            return journalRepository.save(journal);
        });
    }

    private Set<Author> resolveAuthors(List<String> authorNames) {
        Set<Author> authors = new LinkedHashSet<>();
        for (String authorName : authorNames) {
            String normalizedName = normalizeName(authorName);
            if (normalizedName == null) {
                continue;
            }

            Author author = authorRepository.findByNameIgnoreCase(normalizedName).orElseGet(() -> {
                Author newAuthor = new Author();
                newAuthor.setName(normalizedName);
                newAuthor.setAffiliation("Imported from OpenAlex");
                return authorRepository.save(newAuthor);
            });
            authors.add(author);
        }
        return authors;
    }

    private Set<Keyword> resolveKeywords(List<String> keywordNames) {
        Set<Keyword> keywords = new LinkedHashSet<>();
        for (String keywordName : keywordNames) {
            String normalizedName = normalizeToken(keywordName);
            if (normalizedName == null) {
                continue;
            }

            Keyword keyword = keywordRepository.findByNormalizedName(normalizedName).orElseGet(() -> {
                Keyword newKeyword = new Keyword();
                newKeyword.setName(toDisplayName(keywordName));
                newKeyword.setNormalizedName(normalizedName);
                return keywordRepository.save(newKeyword);
            });
            keywords.add(keyword);
        }
        return keywords;
    }

    private Set<ResearchTopic> resolveTopics(List<String> topicNames) {
        Set<ResearchTopic> topics = new LinkedHashSet<>();
        for (String topicName : topicNames) {
            String normalizedName = normalizeName(topicName);
            if (normalizedName == null) {
                continue;
            }

            ResearchTopic topic = researchTopicRepository.findByNameIgnoreCase(normalizedName).orElseGet(() -> {
                ResearchTopic newTopic = new ResearchTopic();
                newTopic.setName(normalizedName);
                newTopic.setDescription("Imported from OpenAlex.");
                newTopic.setDomain("Academic Research");
                return researchTopicRepository.save(newTopic);
            });
            topics.add(topic);
        }
        return topics;
    }

    private String normalizeName(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }

    private String normalizeToken(String value) {
        String normalized = normalizeName(value);
        return normalized == null ? null : normalized.toLowerCase(Locale.ROOT);
    }

    private String toDisplayName(String value) {
        return defaultText(normalizeName(value), "General");
    }

    private String defaultText(String value, String fallback) {
        String normalized = normalizeName(value);
        return normalized == null ? fallback : normalized;
    }
}
