package com.swp.scijournal.sync.service;

import com.swp.scijournal.datasource.repository.ApiDataSourceRepository;
import org.springframework.stereotype.Service;

@Service
public class SyncService {

    private final ApiDataSourceRepository apiDataSourceRepository;

    public SyncService(ApiDataSourceRepository apiDataSourceRepository) {
        this.apiDataSourceRepository = apiDataSourceRepository;
    }

    public String runManualSync() {
        int activeSourceCount = apiDataSourceRepository.findByActiveTrueOrderBySourceNameAsc().size();
        return "Đã tiếp nhận yêu cầu đồng bộ thủ công cho " + activeSourceCount + " nguồn dữ liệu đang bật.";
    }
}
