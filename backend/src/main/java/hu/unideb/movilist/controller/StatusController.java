package hu.unideb.movilist.controller;


import hu.unideb.movilist.data.entity.Status;
import hu.unideb.movilist.data.repository.StatusRepository;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/statuses")
public class StatusController {
    @Autowired
    private StatusRepository statusRepository;


    @GetMapping("")
    public ResponseEntity<List<Status>> getAllStatuses() {
        try {
            List<Status> statuses = statusRepository.findAll();
            return ResponseEntity.ok(statuses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
