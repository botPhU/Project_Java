package com.swp.scijournal.sync.repository;

import com.swp.scijournal.sync.entity.SyncLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SyncLogRepository extends JpaRepository<SyncLog, Long> {
}
