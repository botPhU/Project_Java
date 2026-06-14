package com.swp.scijournal.notification.repository;

import com.swp.scijournal.notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
