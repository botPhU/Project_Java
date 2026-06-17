package com.swp.scijournal.paper.repository;

import com.swp.scijournal.paper.entity.ResearchTopic;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResearchTopicRepository extends JpaRepository<ResearchTopic, Long> {
    Optional<ResearchTopic> findByNameIgnoreCase(String name);
}
