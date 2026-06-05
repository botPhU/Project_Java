package com.swp.scijournal.paper.controller;

import com.swp.scijournal.common.web.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/papers")
public class PaperController {

    @GetMapping("/architecture")
    public ApiResponse<String> architectureNote() {
        return ApiResponse.ok("Paper module placeholder", "Implement search by keyword, author, journal and paper detail.");
    }
}
