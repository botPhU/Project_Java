package com.swp.scijournal.paper.controller;

import com.swp.scijournal.common.web.ApiResponse;
import com.swp.scijournal.paper.dto.PaperDetailResponse;
import com.swp.scijournal.paper.dto.PaperSummaryResponse;
import com.swp.scijournal.paper.service.PaperService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/papers")
public class PaperController {

    private final PaperService paperService;

    public PaperController(PaperService paperService) {
        this.paperService = paperService;
    }

    @GetMapping
    public ApiResponse<List<PaperSummaryResponse>> search(
        @RequestParam(required = false) String keyword,
        @RequestParam(required = false) String author,
        @RequestParam(required = false) String journal,
        @RequestParam(required = false) Integer year
    ) {
        return ApiResponse.ok(
            "Lấy danh sách bài báo thành công.",
            paperService.search(keyword, author, journal, year)
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<PaperDetailResponse> getDetail(@PathVariable Long id) {
        return ApiResponse.ok("Lấy chi tiết bài báo thành công.", paperService.getDetail(id));
    }
}
