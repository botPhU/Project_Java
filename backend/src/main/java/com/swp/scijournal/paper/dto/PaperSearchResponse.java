package com.swp.scijournal.paper.dto;

import java.util.List;

public record PaperSearchResponse(
    List<PaperSummaryResponse> items,
    long totalItems,
    int page,
    int size
) {
}
