package com.swp.scijournal.trend.repository;

import com.swp.scijournal.trend.entity.PublicationTrend;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PublicationTrendRepository extends JpaRepository<PublicationTrend, Long> {
    List<PublicationTrend> findByTargetTypeAndTargetNameIgnoreCaseOrderByPeriodYearAsc(String targetType, String targetName);
}
