package com.swp.scijournal.datasource.dto;

import java.util.List;

public record ExternalPaperRecord(
    String sourceName,
    String sourcePaperId,
    String title,
    String abstractText,
    Integer publicationYear,
    String journal,
    List<String> authors,
    List<String> keywords
) {
}
