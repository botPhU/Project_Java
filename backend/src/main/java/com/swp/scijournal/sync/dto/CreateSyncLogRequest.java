package com.swp.scijournal.sync.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

public record CreateSyncLogRequest(
    @NotBlank
    @Size(max = 150)
    String sourceName,

    @NotNull
    LocalDateTime syncTime,

    @NotBlank
    @Size(max = 50)
    String status,

    Integer recordsProcessed,

    @Size(max = 1000)
    String errorMessage
) {
}
