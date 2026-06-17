package com.swp.scijournal.trend.controller;

import com.swp.scijournal.common.web.ApiResponse;
import com.swp.scijournal.trend.dto.KeywordTrendResponse;
import com.swp.scijournal.trend.service.TrendService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/trends")
public class TrendController {

    private final TrendService trendService;

    public TrendController(TrendService trendService) {
        this.trendService = trendService;
    }

    @GetMapping("/keywords/{keyword}")
    public ApiResponse<KeywordTrendResponse> keywordTrend(@PathVariable String keyword) {
        return ApiResponse.ok("Lấy dữ liệu xu hướng theo keyword thành công.", trendService.getKeywordTrend(keyword));
    }
}
