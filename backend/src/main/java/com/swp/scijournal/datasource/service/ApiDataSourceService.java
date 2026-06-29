package com.swp.scijournal.datasource.service;

import com.swp.scijournal.common.exception.BusinessException;
import com.swp.scijournal.datasource.dto.ApiDataSourceRequest;
import com.swp.scijournal.datasource.dto.ApiDataSourceResponse;
import com.swp.scijournal.datasource.entity.ApiDataSource;
import com.swp.scijournal.datasource.mapper.ApiDataSourceMapper;
import com.swp.scijournal.datasource.repository.ApiDataSourceRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class ApiDataSourceService {

    private final ApiDataSourceRepository repository;
    private final ApiDataSourceMapper mapper;

    public ApiDataSourceService(ApiDataSourceRepository repository, ApiDataSourceMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<ApiDataSourceResponse> listAll() {
        return repository.findAll().stream().map(mapper::toResponse).toList();
    }

    public ApiDataSourceResponse getById(Long id) {
        return repository.findById(id)
            .map(mapper::toResponse)
            .orElseThrow(() -> new BusinessException("ApiDataSource not found: " + id));
    }

    public ApiDataSourceResponse create(ApiDataSourceRequest request) {
        ApiDataSource entity = mapper.toEntity(request);
        ApiDataSource saved = repository.save(entity);
        return mapper.toResponse(saved);
    }

    public ApiDataSourceResponse update(Long id, ApiDataSourceRequest request) {
        ApiDataSource entity = repository.findById(id)
            .orElseThrow(() -> new BusinessException("ApiDataSource not found: " + id));
        mapper.updateEntity(entity, request);
        ApiDataSource saved = repository.save(entity);
        return mapper.toResponse(saved);
    }

    public ApiDataSourceResponse setActive(Long id, boolean active) {
        ApiDataSource entity = repository.findById(id)
            .orElseThrow(() -> new BusinessException("ApiDataSource not found: " + id));
        entity.setActive(active);
        repository.save(entity);
        return mapper.toResponse(entity);
    }

    public void updateLastSyncAt(Long id, Instant when) {
        ApiDataSource entity = repository.findById(id)
            .orElseThrow(() -> new BusinessException("ApiDataSource not found: " + id));
        entity.setLastSyncAt(when == null ? Instant.now() : when);
        repository.save(entity);
    }
}
