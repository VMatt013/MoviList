package hu.unideb.movilist.controller;

import hu.unideb.movilist.data.entity.User;
import hu.unideb.movilist.data.repository.UserRepository;
import hu.unideb.movilist.service.UserService;
import hu.unideb.movilist.service.dto.UserDto;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @GetMapping("")
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = userRepository.findAll();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable("id") long id){

        User user = userRepository.findById(id).orElseThrow(() ->
                new RuntimeException("User not found with id: " + id));

        return user;
    }


    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody UserDto userDto) {
        User savedUser = userService.saveUser(userDto);
        return ResponseEntity.ok(savedUser);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") long id){
        userRepository.deleteById(id);
    }
}

