package com.swp.scijournal.trend.dto;

import java.util.List;

public record KeywordTrendResponse(
    String keyword,
    List<TrendPointResponse> points
) {
}
