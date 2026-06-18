package com.swp.scijournal.datasource.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ApiDataSourceRequest(
    @NotBlank
    @Size(max = 100)
    String sourceName,

    @Size(max = 500)
    String baseUrl,

    Integer rateLimitPerMinute,

    Boolean active
) {
}
