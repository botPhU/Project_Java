package com.swp.scijournal.paper.repository;

import com.swp.scijournal.paper.entity.Journal;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JournalRepository extends JpaRepository<Journal, Long> {
    Optional<Journal> findByNameIgnoreCase(String name);
}
