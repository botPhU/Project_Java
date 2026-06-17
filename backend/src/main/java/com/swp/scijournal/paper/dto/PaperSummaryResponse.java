package com.swp.scijournal.paper.dto;

import java.util.List;

public record PaperSummaryResponse(
    Long id,
    String title,
    Integer publicationYear,
    Integer citationCount,
    String journal,
    List<String> authors,
    List<String> keywords
) {
}
