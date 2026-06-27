package com.swp.scijournal.paper.repository;

import com.swp.scijournal.paper.entity.Keyword;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KeywordRepository extends JpaRepository<Keyword, Long> {
    Optional<Keyword> findByNormalizedName(String normalizedName);
}
