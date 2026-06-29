package com.swp.scijournal.sync.service;

import com.swp.scijournal.common.exception.BusinessException;
import com.swp.scijournal.sync.dto.CreateSyncLogRequest;
import com.swp.scijournal.sync.dto.SyncLogResponse;
import com.swp.scijournal.sync.entity.SyncLog;
import com.swp.scijournal.sync.mapper.SyncLogMapper;
import com.swp.scijournal.sync.repository.SyncLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SyncLogService {

    private final SyncLogRepository repository;
    private final SyncLogMapper mapper;

    public SyncLogService(SyncLogRepository repository, SyncLogMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<SyncLogResponse> findAll() {
        return repository.findAll().stream().map(mapper::toResponse).toList();
    }

    public SyncLogResponse findById(Long id) {
        return repository.findById(id)
            .map(mapper::toResponse)
            .orElseThrow(() -> new BusinessException("SyncLog not found: " + id));
    }

    public SyncLogResponse create(CreateSyncLogRequest request) {
        SyncLog syncLog = mapper.toEntity(request);
        SyncLog saved = repository.save(syncLog);
        return mapper.toResponse(saved);
    }
}
