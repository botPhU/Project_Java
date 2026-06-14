package com.swp.scijournal.bookmark.controller;

import com.swp.scijournal.bookmark.dto.BookmarkResponse;
import com.swp.scijournal.bookmark.service.BookmarkService;
import com.swp.scijournal.common.web.ApiResponse;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/bookmarks")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    public BookmarkController(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    @PostMapping("/papers/{paperId}")
    public ApiResponse<BookmarkResponse> bookmarkPaper(@PathVariable Long paperId) {
        return ApiResponse.ok("Lưu bookmark bài báo thành công.", bookmarkService.savePaperBookmark(paperId));
    }
}
