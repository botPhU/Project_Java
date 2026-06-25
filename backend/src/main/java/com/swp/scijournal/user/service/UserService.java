package com.swp.scijournal.user.service;

import com.swp.scijournal.user.dto.UserProfileResponse;
import com.swp.scijournal.user.entity.User;
import org.springframework.stereotype.Service;

@Service
public class UserService {

private final CurrentUserService currentUserService;

public UserService(CurrentUserService currentUserService) {
    this.currentUserService = currentUserService;
}

public UserProfileResponse getCurrentUserProfile() {
    User user = currentUserService.requireCurrentUser();

    return new UserProfileResponse(
        user.getId(),
        user.getUsername(),
        user.getFullName(),
        user.getEmail(),
        user.getRole().getName().name()
    );
}

}
