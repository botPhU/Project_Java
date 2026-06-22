package com.swp.scijournal.bookmark.service;

import com.swp.scijournal.bookmark.dto.BookmarkResponse;
import com.swp.scijournal.bookmark.entity.Bookmark;
import com.swp.scijournal.bookmark.repository.BookmarkRepository;
import com.swp.scijournal.paper.entity.ResearchPaper;
import com.swp.scijournal.paper.repository.ResearchPaperRepository;
import com.swp.scijournal.user.entity.User;
import com.swp.scijournal.user.service.CurrentUserService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final ResearchPaperRepository researchPaperRepository;
    private final CurrentUserService currentUserService;

    public BookmarkService(
        BookmarkRepository bookmarkRepository,
        ResearchPaperRepository researchPaperRepository,
        CurrentUserService currentUserService
    ) {
        this.bookmarkRepository = bookmarkRepository;
        this.researchPaperRepository = researchPaperRepository;
        this.currentUserService = currentUserService;
    }

    public BookmarkResponse savePaperBookmark(Long paperId) {
        User currentUser = currentUserService.requireCurrentUser();
        ResearchPaper paper = researchPaperRepository.findById(paperId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy bài báo."));

        Bookmark bookmark = bookmarkRepository.findByUserIdAndPaperId(currentUser.getId(), paperId)
            .orElseGet(() -> {
                Bookmark newBookmark = new Bookmark();
                newBookmark.setUser(currentUser);
                newBookmark.setPaper(paper);
                return bookmarkRepository.save(newBookmark);
            });

        return new BookmarkResponse(bookmark.getId(), paper.getId(), paper.getTitle());
    }
}
