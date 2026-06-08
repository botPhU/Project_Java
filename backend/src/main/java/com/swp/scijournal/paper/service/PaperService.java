package com.swp.scijournal.paper.service;

import com.swp.scijournal.paper.dto.PaperDetailResponse;
import com.swp.scijournal.paper.dto.PaperSummaryResponse;
import com.swp.scijournal.paper.entity.ResearchPaper;
import com.swp.scijournal.paper.repository.ResearchPaperRepository;
import java.util.Comparator;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class PaperService {

    private final ResearchPaperRepository researchPaperRepository;

    public PaperService(ResearchPaperRepository researchPaperRepository) {
        this.researchPaperRepository = researchPaperRepository;
    }

    public List<PaperSummaryResponse> search(String keyword, String author, String journal, Integer year) {
        return researchPaperRepository.search(normalize(keyword), normalize(author), normalize(journal), year)
            .stream()
            .map(this::toSummary)
            .toList();
    }

    public PaperDetailResponse getDetail(Long id) {
        ResearchPaper paper = researchPaperRepository.findWithDetailsById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy bài báo."));

        return new PaperDetailResponse(
            paper.getId(),
            paper.getTitle(),
            paper.getAbstractText(),
            paper.getPublicationYear(),
            paper.getJournal().getName(),
            paper.getSourceName(),
            paper.getSourcePaperId(),
            paper.getAuthors().stream().map(author -> author.getName()).sorted().toList(),
            paper.getKeywords().stream().map(keyword -> keyword.getName()).sorted().toList()
        );
    }

    private PaperSummaryResponse toSummary(ResearchPaper paper) {
        return new PaperSummaryResponse(
            paper.getId(),
            paper.getTitle(),
            paper.getPublicationYear(),
            paper.getJournal().getName(),
            paper.getAuthors().stream()
                .map(author -> author.getName())
                .sorted(Comparator.naturalOrder())
                .toList(),
            paper.getKeywords().stream()
                .map(keyword -> keyword.getName())
                .sorted(Comparator.naturalOrder())
                .toList()
        );
    }

    private String normalize(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }
}
