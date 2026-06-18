package com.swp.scijournal.datasource.dto;

import java.time.Instant;

public record ApiDataSourceResponse(
    Long id,
    String sourceName,
    String baseUrl,
    boolean active,
    Integer rateLimitPerMinute,
    Instant lastSyncAt
) {
}
