package com.swp.scijournal.trend.service;

import com.swp.scijournal.trend.dto.KeywordTrendResponse;
import com.swp.scijournal.trend.dto.TrendPointResponse;
import com.swp.scijournal.trend.repository.PublicationTrendRepository;
import org.springframework.stereotype.Service;

@Service
public class TrendService {

    private final PublicationTrendRepository publicationTrendRepository;

    public TrendService(PublicationTrendRepository publicationTrendRepository) {
        this.publicationTrendRepository = publicationTrendRepository;
    }

    public KeywordTrendResponse getKeywordTrend(String keyword) {
        String normalizedKeyword = keyword == null ? "" : keyword.trim().toLowerCase();
        return new KeywordTrendResponse(
            normalizedKeyword,
            publicationTrendRepository.findByTargetTypeAndTargetNameIgnoreCaseOrderByPeriodYearAsc("KEYWORD", normalizedKeyword)
                .stream()
                .map(trend -> new TrendPointResponse(trend.getPeriodYear(), trend.getPublicationCount()))
                .toList()
        );
    }
}
