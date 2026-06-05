package com.swp.scijournal.trend.controller;

import com.swp.scijournal.common.web.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/trends")
public class TrendController {

    @GetMapping("/architecture")
    public ApiResponse<String> architectureNote() {
        return ApiResponse.ok("Trend module placeholder", "Implement keyword/topic trend chart and top rising topics.");
    }
}
