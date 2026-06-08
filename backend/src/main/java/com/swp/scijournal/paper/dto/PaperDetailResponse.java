package com.swp.scijournal.paper.dto;

import java.util.List;

public record PaperDetailResponse(
    Long id,
    String title,
    String abstractText,
    Integer publicationYear,
    String journal,
    String sourceName,
    String sourcePaperId,
    List<String> authors,
    List<String> keywords
) {
}
