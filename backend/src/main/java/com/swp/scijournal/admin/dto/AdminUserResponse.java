package com.swp.scijournal.admin.dto;

public record AdminUserResponse(
    Long id,
    String username,
    String fullName,
    String email,
    String role,
    boolean active
) {
}
