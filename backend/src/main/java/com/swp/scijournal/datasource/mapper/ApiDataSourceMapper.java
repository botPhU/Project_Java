package com.swp.scijournal.datasource.mapper;

import com.swp.scijournal.datasource.dto.ApiDataSourceRequest;
import com.swp.scijournal.datasource.dto.ApiDataSourceResponse;
import com.swp.scijournal.datasource.entity.ApiDataSource;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class ApiDataSourceMapper {

    public ApiDataSourceResponse toResponse(ApiDataSource entity) {
        if (entity == null) return null;
        return new ApiDataSourceResponse(
            entity.getId(),
            entity.getSourceName(),
            entity.getBaseUrl(),
            entity.isActive(),
            entity.getRateLimitPerMinute(),
            entity.getLastSyncAt()
        );
    }

    public ApiDataSource toEntity(ApiDataSourceRequest request) {
        ApiDataSource e = new ApiDataSource();
        e.setSourceName(request.sourceName());
        e.setBaseUrl(request.baseUrl());
        if (request.active() != null) e.setActive(request.active());
        e.setRateLimitPerMinute(request.rateLimitPerMinute());
        // lastSyncAt left null until first sync
        return e;
    }

    public void updateEntity(ApiDataSource entity, ApiDataSourceRequest request) {
        entity.setSourceName(request.sourceName());
        entity.setBaseUrl(request.baseUrl());
        if (request.active() != null) entity.setActive(request.active());
        entity.setRateLimitPerMinute(request.rateLimitPerMinute());
        // do not modify lastSyncAt here
    }
}
