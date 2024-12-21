package hu.unideb.movilist.controller;


import hu.unideb.movilist.data.entity.Genre;
import hu.unideb.movilist.data.repository.GenreRepository;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/genres")
public class GenreController {
    @Autowired
    private GenreRepository genreRepository;


    @GetMapping("")
    public ResponseEntity<List<Genre>> getAllGenres() {
        try {
            List<Genre> genres = genreRepository.findAll();
            return ResponseEntity.ok(genres);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
