package hu.unideb.movilist.service;

import hu.unideb.movilist.data.entity.User;
import hu.unideb.movilist.data.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.Collections;


@Service
public class UserService {
    @Autowired
    UserRepository repository;

    public UserDetailsService userDetailsService() {

        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String email) {
                User user = repository.findByEmail(email);
                user.authorities.add(new SimpleGrantedAuthority(user.getRole().getRoleName()));
                return user;
            }
        };
    }
    public boolean hasId(int id){
        String username =  ((UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        User user = repository.findByEmail(username);
        return user.getId() == id;

    }

}


