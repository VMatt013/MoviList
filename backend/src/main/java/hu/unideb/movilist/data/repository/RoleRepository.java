package hu.unideb.movilist.data.repository;

import hu.unideb.movilist.data.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}

