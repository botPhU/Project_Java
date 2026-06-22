package com.swp.scijournal.admin.service;

import com.swp.scijournal.admin.dto.SyncRunResponse;
import com.swp.scijournal.sync.service.SyncService;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final SyncService syncService;

    public AdminService(SyncService syncService) {
        this.syncService = syncService;
    }

    public SyncRunResponse runSync() {
        return new SyncRunResponse(true, syncService.runManualSync());
    }
}
