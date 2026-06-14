package com.swp.scijournal.user.dto;

public record UserProfileResponse(
    Long id,
    String username,
    String fullName,
    String email,
    String role
) {
}
