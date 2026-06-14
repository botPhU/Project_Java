package com.swp.scijournal.user.controller;

import com.swp.scijournal.common.web.ApiResponse;
import com.swp.scijournal.user.dto.UserProfileResponse;
import com.swp.scijournal.user.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ApiResponse<UserProfileResponse> me() {
        return ApiResponse.ok("Lấy thông tin người dùng hiện tại thành công.", userService.getCurrentUserProfile());
    }
}
