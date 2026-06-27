package com.swp.scijournal.paper.service;

import com.swp.scijournal.paper.dto.PaperSearchRequest;
import com.swp.scijournal.paper.dto.PaperSearchResponse;
import com.swp.scijournal.paper.dto.PaperSummaryResponse;
import com.swp.scijournal.paper.entity.Author;
import com.swp.scijournal.paper.entity.Keyword;
import com.swp.scijournal.paper.entity.ResearchPaper;
import com.swp.scijournal.paper.repository.ResearchPaperRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class PaperQueryService {

private final ResearchPaperRepository researchPaperRepository;

public PaperQueryService(ResearchPaperRepository researchPaperRepository) {
    this.researchPaperRepository = researchPaperRepository;
}

public PaperSearchResponse search(PaperSearchRequest request) {

    List<ResearchPaper> papers = researchPaperRepository.search(
        request.keyword(),
        request.author(),
        request.journal(),
        request.year()
    );

    int page = request.page() == null ? 0 : request.page();
    int size = request.size() == null ? 10 : request.size();

    List<PaperSummaryResponse> items = papers.stream()
        .map(paper -> new PaperSummaryResponse(
            paper.getId(),
            paper.getTitle(),
            paper.getPublicationYear(),
            paper.getCitationCount(),
            paper.getJournal().getName(),
            paper.getAuthors().stream()
                .map(Author::getName)
                .toList(),
            paper.getKeywords().stream()
                .map(Keyword::getName)
                .toList()
        ))
        .toList();

    return new PaperSearchResponse(
        items,
        items.size(),
        page,
        size
    );
}

}
