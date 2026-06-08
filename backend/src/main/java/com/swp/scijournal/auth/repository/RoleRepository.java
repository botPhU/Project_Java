package com.swp.scijournal.auth.repository;

import com.swp.scijournal.auth.entity.Role;
import com.swp.scijournal.auth.entity.RoleName;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName name);
}
