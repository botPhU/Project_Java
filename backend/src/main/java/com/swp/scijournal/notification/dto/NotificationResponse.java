package com.swp.scijournal.notification.dto;

public record NotificationResponse(
    Long id,
    String title,
    String content,
    boolean read
) {
}
