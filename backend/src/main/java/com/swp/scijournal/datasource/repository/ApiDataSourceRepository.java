package com.swp.scijournal.datasource.repository;

import com.swp.scijournal.datasource.entity.ApiDataSource;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApiDataSourceRepository extends JpaRepository<ApiDataSource, Long> {
}
