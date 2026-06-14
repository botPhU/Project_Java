package com.swp.scijournal.notification.controller;

import com.swp.scijournal.common.web.ApiResponse;
import com.swp.scijournal.notification.service.NotificationService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public ApiResponse<List<?>> list() {
        return ApiResponse.ok("Lấy danh sách thông báo thành công.", notificationService.getNotifications());
    }
}
