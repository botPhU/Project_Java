package com.swp.scijournal.datasource.controller;

import com.swp.scijournal.common.web.ApiResponse;
import com.swp.scijournal.datasource.dto.ApiDataSourceRequest;
import com.swp.scijournal.datasource.dto.ApiDataSourceResponse;
import com.swp.scijournal.datasource.service.ApiDataSourceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/datasources")
public class ApiDataSourceController {

    private final ApiDataSourceService service;

    public ApiDataSourceController(ApiDataSourceService service) {
        this.service = service;
    }

    @GetMapping
    public ApiResponse<List<ApiDataSourceResponse>> list() {
        return ApiResponse.ok("Lấy danh sách nguồn dữ liệu.", service.listAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<ApiDataSourceResponse> get(@PathVariable Long id) {
        return ApiResponse.ok("Lấy nguồn dữ liệu.", service.getById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<ApiDataSourceResponse> create(@Valid @RequestBody ApiDataSourceRequest request) {
        return ApiResponse.ok("Tạo nguồn dữ liệu thành công.", service.create(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<ApiDataSourceResponse> update(@PathVariable Long id, @Valid @RequestBody ApiDataSourceRequest request) {
        return ApiResponse.ok("Cập nhật nguồn dữ liệu thành công.", service.update(id, request));
    }

    @PostMapping("/{id}/enable")
    public ApiResponse<ApiDataSourceResponse> enable(@PathVariable Long id) {
        return ApiResponse.ok("Kích hoạt nguồn dữ liệu.", service.setActive(id, true));
    }

    @PostMapping("/{id}/disable")
    public ApiResponse<ApiDataSourceResponse> disable(@PathVariable Long id) {
        return ApiResponse.ok("Vô hiệu hóa nguồn dữ liệu.", service.setActive(id, false));
    }

}
