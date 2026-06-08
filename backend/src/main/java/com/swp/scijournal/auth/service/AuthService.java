package com.swp.scijournal.auth.service;

import com.swp.scijournal.auth.dto.AuthResponse;
import com.swp.scijournal.auth.dto.LoginRequest;
import com.swp.scijournal.auth.dto.RegisterRequest;
import com.swp.scijournal.auth.entity.Role;
import com.swp.scijournal.auth.entity.RoleName;
import com.swp.scijournal.auth.repository.RoleRepository;
import com.swp.scijournal.user.entity.User;
import com.swp.scijournal.user.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
        UserRepository userRepository,
        RoleRepository roleRepository,
        PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.username())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Tên đăng nhập đã tồn tại.");
        }
        if (userRepository.existsByEmail(request.email())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email đã tồn tại.");
        }

        Role defaultRole = roleRepository.findByName(RoleName.LECTURER_STUDENT)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Không tìm thấy vai trò mặc định."));

        User user = new User();
        user.setUsername(request.username().trim());
        user.setEmail(request.email().trim().toLowerCase());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setFullName(request.fullName().trim());
        user.setRole(defaultRole);

        User savedUser = userRepository.save(user);
        return toAuthResponse(savedUser, "Đăng ký thành công.");
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.username().trim())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Sai tên đăng nhập hoặc mật khẩu."));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Sai tên đăng nhập hoặc mật khẩu.");
        }

        return toAuthResponse(user, "Đăng nhập thành công. Có thể dùng Basic Auth cho các API cần bảo vệ.");
    }

    private AuthResponse toAuthResponse(User user, String message) {
        return new AuthResponse(
            user.getId(),
            user.getUsername(),
            user.getFullName(),
            user.getEmail(),
            user.getRole().getName().name(),
            message
        );
    }
}
