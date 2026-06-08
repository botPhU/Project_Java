package com.swp.scijournal.auth.dto;

public record AuthResponse(
    Long userId,
    String username,
    String fullName,
    String email,
    String role,
    String message
) {
}
