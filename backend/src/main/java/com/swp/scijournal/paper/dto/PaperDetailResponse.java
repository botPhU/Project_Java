package com.swp.scijournal.paper.dto;

import java.util.List;

public record PaperDetailResponse(
    Long id,
    String title,
    String abstractText,
    Integer publicationYear,
    String doi,
    Integer citationCount,
    String journal,
    String url,
    String sourceName,
    String sourcePaperId,
    List<String> authors,
    List<String> keywords,
    List<String> topics
) {
}
