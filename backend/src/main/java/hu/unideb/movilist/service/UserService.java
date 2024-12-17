package hu.unideb.movilist.service;

import hu.unideb.movilist.data.entity.User;
import hu.unideb.movilist.data.entity.Role;
import hu.unideb.movilist.data.repository.UserRepository;
import hu.unideb.movilist.data.repository.RoleRepository;
import hu.unideb.movilist.service.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public User saveUser(UserDto userDto) {
        // Fetch the Role entity using the roleId from the DTO
        Role role = roleRepository.findById(userDto.getRoleId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid role ID: " + userDto.getRoleId()));

        // Build the User entity
        User user = User.builder()
                .username(userDto.getUsername())
                .email(userDto.getEmail())
                .role(role) // Assign the Role object
                .password(userDto.getPassword())
                .build();

        // Save and return the User entity
        return userRepository.save(user);
    }
}
