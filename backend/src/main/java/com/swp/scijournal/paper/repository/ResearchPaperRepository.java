package com.swp.scijournal.paper.repository;

import com.swp.scijournal.paper.entity.ResearchPaper;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ResearchPaperRepository extends JpaRepository<ResearchPaper, Long> {

    @EntityGraph(attributePaths = {"journal", "authors", "keywords", "topics"})
    @Query("select p from ResearchPaper p where p.id = :id")
    Optional<ResearchPaper> findWithDetailsById(@Param("id") Long id);

    @EntityGraph(attributePaths = {"journal", "authors", "keywords", "topics"})
    @Query("""
        select distinct p from ResearchPaper p
        left join p.authors a
        left join p.keywords k
        left join p.topics t
        left join p.journal j
        where (:keyword is null or lower(p.title) like lower(concat('%', :keyword, '%'))
            or lower(p.abstractText) like lower(concat('%', :keyword, '%'))
            or lower(k.name) like lower(concat('%', :keyword, '%'))
            or lower(t.name) like lower(concat('%', :keyword, '%')))
          and (:author is null or lower(a.name) like lower(concat('%', :author, '%')))
          and (:journal is null or lower(j.name) like lower(concat('%', :journal, '%')))
          and (:year is null or p.publicationYear = :year)
        order by p.publicationYear desc, p.id desc
        """)
    List<ResearchPaper> search(
        @Param("keyword") String keyword,
        @Param("author") String author,
        @Param("journal") String journal,
        @Param("year") Integer year
    );
}
