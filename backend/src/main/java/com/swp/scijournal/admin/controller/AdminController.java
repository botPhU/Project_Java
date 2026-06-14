package com.swp.scijournal.admin.controller;

import com.swp.scijournal.admin.dto.SyncRunResponse;
import com.swp.scijournal.admin.service.AdminService;
import com.swp.scijournal.common.web.ApiResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/sync/run")
    public ApiResponse<SyncRunResponse> runSync() {
        return ApiResponse.ok("Đã gửi yêu cầu chạy đồng bộ.", adminService.runSync());
    }
}
