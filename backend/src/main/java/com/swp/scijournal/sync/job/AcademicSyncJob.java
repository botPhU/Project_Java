package com.swp.scijournal.sync.job;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class AcademicSyncJob {

    // Placeholder scheduler so the sync module has an explicit entry point.
    @Scheduled(cron = "${app.sync.cron:0 0 2 * * *}")
    public void syncMetadata() {
        // TODO: call datasource clients, normalize metadata, store papers, recompute trends.
    }
}
