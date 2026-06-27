package com.swp.scijournal.auth.service;

import com.swp.scijournal.auth.dto.AuthResponse;
import com.swp.scijournal.auth.dto.LoginRequest;
import com.swp.scijournal.auth.dto.RegisterRequest;
import com.swp.scijournal.auth.entity.Role;
import com.swp.scijournal.auth.entity.RoleName;
import com.swp.scijournal.auth.repository.RoleRepository;
import com.swp.scijournal.user.entity.User;
import com.swp.scijournal.user.repository.UserRepository;
import java.util.Set;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private static final Set<RoleName> SELF_REGISTER_ROLES = Set.of(
        RoleName.LECTURER_STUDENT,
        RoleName.RESEARCHER
    );

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

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.username())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Tên đăng nhập đã tồn tại.");
        }
        if (userRepository.existsByEmail(request.email())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email đã tồn tại.");
        }

        RoleName requestedRole;
        try {
            requestedRole = RoleName.valueOf(request.role().trim().toUpperCase());
        } catch (IllegalArgumentException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Vai trò đăng ký không hợp lệ.");
        }

        if (!SELF_REGISTER_ROLES.contains(requestedRole)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Bạn không thể tự đăng ký vai trò này.");
        }

        Role selectedRole = roleRepository.findByName(requestedRole)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Không tìm thấy vai trò đã chọn."));

        User user = new User();
        user.setUsername(request.username().trim());
        user.setEmail(request.email().trim().toLowerCase());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setFullName(request.fullName().trim());
        user.setInstitution(trimToNull(request.institution()));
        user.setResearchInterests(trimToNull(request.researchInterests()));
        user.setRole(selectedRole);

        User savedUser = userRepository.save(user);
        return toAuthResponse(savedUser, "Đăng ký thành công.");
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.username().trim())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Sai tên đăng nhập hoặc mật khẩu."));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Sai tên đăng nhập hoặc mật khẩu.");
        }

        return toAuthResponse(user, "Đăng nhập thành công.");
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

    private String trimToNull(String value) {
        if (value == null) {
            return null;
        }

        String trimmedValue = value.trim();
        return trimmedValue.isEmpty() ? null : trimmedValue;
    }
}
