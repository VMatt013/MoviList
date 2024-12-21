package hu.unideb.movilist.service;

import hu.unideb.movilist.data.entity.User;
import hu.unideb.movilist.data.repository.UserRepository;
import hu.unideb.movilist.data.entity.Role;
import hu.unideb.movilist.data.repository.RoleRepository;
import hu.unideb.movilist.service.dto.LoginDto;
import hu.unideb.movilist.service.dto.RegistrationDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService{
    @Autowired
    UserRepository repository;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    AuthenticationManager manager;

    @Autowired
    JwtService jwtService;


      public String registration(RegistrationDto dto) {
        User userEntity = new User();
        userEntity.setUsername(dto.getUsername());
        userEntity.setEmail(dto.getEmail());
        userEntity.setPassword(encoder.encode(dto.getPassword()));
        userEntity.setRole(new Role(2, "User"));


        userEntity = repository.save(userEntity);

        return jwtService.generateToken(userEntity, userEntity.getId(), userEntity.getRole());

    }

    public String login(LoginDto dto) {
        manager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getEmail(),dto.getPassword())
        );
        var user = repository.findByEmail(dto.getEmail());
        return jwtService.generateToken(user, user.getId(), user.getRole());
    }
}
