package com.swp.scijournal.dashboard.controller;

import com.swp.scijournal.common.web.ApiResponse;
import com.swp.scijournal.dashboard.dto.DashboardOverviewResponse;
import com.swp.scijournal.dashboard.service.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/overview")
    public ApiResponse<DashboardOverviewResponse> overview() {
        return ApiResponse.ok("Lấy dữ liệu dashboard thành công.", dashboardService.getOverview());
    }
}
