package com.swp.scijournal.datasource.crossref;

import com.swp.scijournal.datasource.dto.ExternalPaperRecord;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class CrossrefClient {

    public List<ExternalPaperRecord> fetchLatestRecords() {
        throw new UnsupportedOperationException("TODO: Tích hợp Crossref API.");
    }
}
