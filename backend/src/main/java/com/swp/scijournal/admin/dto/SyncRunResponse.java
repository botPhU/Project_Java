package com.swp.scijournal.admin.dto;

public record SyncRunResponse(
    boolean started,
    String message
) {
}
