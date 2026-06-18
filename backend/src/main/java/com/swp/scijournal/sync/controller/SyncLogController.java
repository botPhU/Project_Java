package com.swp.scijournal.sync.controller;

import com.swp.scijournal.common.web.ApiResponse;
import com.swp.scijournal.sync.dto.CreateSyncLogRequest;
import com.swp.scijournal.sync.dto.SyncLogResponse;
import com.swp.scijournal.sync.service.SyncLogService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/sync/logs")
public class SyncLogController {

    private final SyncLogService service;

    public SyncLogController(SyncLogService service) {
        this.service = service;
    }

    @GetMapping
    public ApiResponse<List<SyncLogResponse>> list() {
        return ApiResponse.ok("Lấy danh sách sync log.", service.findAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<SyncLogResponse> getById(@PathVariable Long id) {
        return ApiResponse.ok("Lấy sync log.", service.findById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<SyncLogResponse> create(@Valid @RequestBody CreateSyncLogRequest request) {
        return ApiResponse.ok("Tạo sync log thành công.", service.create(request));
    }
}
