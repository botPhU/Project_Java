package com.swp.scijournal.paper.repository;

import com.swp.scijournal.paper.entity.Author;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<Author, Long> {
    Optional<Author> findByNameIgnoreCase(String name);
}
