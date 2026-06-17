package com.swp.scijournal.bookmark.repository;

import com.swp.scijournal.bookmark.entity.Bookmark;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    Optional<Bookmark> findByUserIdAndPaperId(Long userId, Long paperId);
}
