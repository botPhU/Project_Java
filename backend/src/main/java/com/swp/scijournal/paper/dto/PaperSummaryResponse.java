package com.swp.scijournal.paper.dto;

import java.util.List;

public record PaperSummaryResponse(
    Long id,
    String title,
    Integer publicationYear,
    String journal,
    List<String> authors,
    List<String> keywords
) {
}
