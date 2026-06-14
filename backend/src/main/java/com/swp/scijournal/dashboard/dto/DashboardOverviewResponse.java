package com.swp.scijournal.dashboard.dto;

import java.util.List;
import java.util.Map;

public record DashboardOverviewResponse(
    long totalPapers,
    List<Map<String, Object>> topKeywords,
    List<Map<String, Object>> topJournals,
    List<Map<String, Object>> yearlyTrend
) {
}
