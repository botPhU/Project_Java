package com.swp.scijournal.notification.service;

import com.swp.scijournal.notification.dto.NotificationResponse;
import com.swp.scijournal.notification.repository.NotificationRepository;
import com.swp.scijournal.user.entity.User;
import com.swp.scijournal.user.service.CurrentUserService;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final CurrentUserService currentUserService;

    public NotificationService(
        NotificationRepository notificationRepository,
        CurrentUserService currentUserService
    ) {
        this.notificationRepository = notificationRepository;
        this.currentUserService = currentUserService;
    }

    public List<NotificationResponse> getNotifications() {
        User currentUser = currentUserService.requireCurrentUser();
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(currentUser.getId())
            .stream()
            .map(notification -> new NotificationResponse(
                notification.getId(),
                notification.getTitle(),
                notification.getContent(),
                notification.isRead()
            ))
            .toList();
    }
}
