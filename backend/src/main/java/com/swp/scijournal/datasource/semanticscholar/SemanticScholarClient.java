package com.swp.scijournal.datasource.semanticscholar;

import com.swp.scijournal.datasource.dto.ExternalPaperRecord;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class SemanticScholarClient {

    public List<ExternalPaperRecord> fetchLatestRecords() {
        throw new UnsupportedOperationException("TODO: Tích hợp Semantic Scholar API.");
    }
}
