package com.swp.scijournal.sync.dto;

import java.time.LocalDateTime;

public record SyncLogResponse(
    Long id,
    String sourceName,
    LocalDateTime syncTime,
    String status,
    Integer recordsProcessed,
    String errorMessage
) {
}
