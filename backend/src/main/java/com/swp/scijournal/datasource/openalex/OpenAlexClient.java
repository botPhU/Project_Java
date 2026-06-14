package com.swp.scijournal.datasource.openalex;

import com.swp.scijournal.datasource.dto.ExternalPaperRecord;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class OpenAlexClient {

    public List<ExternalPaperRecord> fetchLatestRecords() {
        throw new UnsupportedOperationException("TODO: Tích hợp OpenAlex API.");
    }
}
