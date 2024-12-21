package hu.unideb.movilist.controller;

import hu.unideb.movilist.service.AuthService;
import hu.unideb.movilist.service.dto.LoginDto;
import hu.unideb.movilist.service.dto.RegistrationDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AuthService service;


    @PostMapping("/registration")
    public String registration(@RequestBody RegistrationDto dto){
        return service.registration(dto);
    }


    @PostMapping("/login")
    public String login(@RequestBody LoginDto dto){
        return service.login(dto);
    }
}
