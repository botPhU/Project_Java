package com.swp.scijournal.datasource.dto;

import java.time.LocalDate;
import java.util.List;

public record ExternalPaperRecord(
    String sourceName,
    String sourcePaperId,
    String title,
    String abstractText,
    Integer publicationYear,
    LocalDate publicationDate,
    String doi,
    String language,
    String documentType,
    String url,
    Integer citationCount,
    String journal,
    List<String> authors,
    List<String> keywords,
    List<String> topics
) {
}
