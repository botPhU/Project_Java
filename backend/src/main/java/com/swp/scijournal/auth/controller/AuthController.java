package com.swp.scijournal.auth.controller;

import com.swp.scijournal.auth.dto.AuthResponse;
import com.swp.scijournal.auth.dto.LoginRequest;
import com.swp.scijournal.auth.dto.RegisterRequest;
import com.swp.scijournal.auth.service.AuthService;
import com.swp.scijournal.common.web.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ApiResponse<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ApiResponse.ok("Đăng ký thành công.", authService.register(request));
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ApiResponse.ok("Đăng nhập thành công.", authService.login(request));
    }
}
