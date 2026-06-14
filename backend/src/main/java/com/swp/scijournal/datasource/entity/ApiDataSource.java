package com.swp.scijournal.datasource.entity;

import com.swp.scijournal.common.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "api_data_sources")
public class ApiDataSource extends BaseEntity {

    @Column(nullable = false, unique = true, length = 100)
    private String sourceName;

    @Column(length = 500)
    private String baseUrl;

    @Column(nullable = false)
    private boolean active = true;

    public String getSourceName() {
        return sourceName;
    }

    public void setSourceName(String sourceName) {
        this.sourceName = sourceName;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
