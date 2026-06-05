package com.swp.scijournal.auth.controller;

import com.swp.scijournal.common.web.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @GetMapping("/architecture")
    public ApiResponse<String> architectureNote() {
        return ApiResponse.ok("Authentication module placeholder", "Implement register, login, refresh-token, logout.");
    }
}
