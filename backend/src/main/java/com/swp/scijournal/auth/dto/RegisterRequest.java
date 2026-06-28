package com.swp.scijournal.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
    @NotBlank @Size(min = 3, max = 100) String username,
    @NotBlank @Email String email,
    @NotBlank @Size(min = 6, max = 100) String password,
    @NotBlank @Size(max = 150) String fullName,
    @NotBlank @Size(max = 50) String role,
    @Size(max = 255) String institution,
    @Size(max = 1000) String researchInterests
) {
}
