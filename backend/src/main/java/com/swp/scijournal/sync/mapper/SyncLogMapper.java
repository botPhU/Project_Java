package com.swp.scijournal.sync.mapper;

import com.swp.scijournal.sync.dto.CreateSyncLogRequest;
import com.swp.scijournal.sync.dto.SyncLogResponse;
import com.swp.scijournal.sync.entity.SyncLog;
import org.springframework.stereotype.Component;

@Component
public class SyncLogMapper {

    public SyncLogResponse toResponse(SyncLog entity) {
        if (entity == null) {
            return null;
        }
        return new SyncLogResponse(
            entity.getId(),
            entity.getSourceName(),
            entity.getSyncTime(),
            entity.getStatus(),
            entity.getRecordsProcessed(),
            entity.getErrorMessage()
        );
    }

    public SyncLog toEntity(CreateSyncLogRequest request) {
        SyncLog entity = new SyncLog();
        entity.setSourceName(request.sourceName());
        entity.setSyncTime(request.syncTime());
        entity.setStatus(request.status());
        entity.setRecordsProcessed(request.recordsProcessed());
        entity.setErrorMessage(request.errorMessage());
        return entity;
    }
}
