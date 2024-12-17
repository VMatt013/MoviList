package hu.unideb.movilist.controller;


import hu.unideb.movilist.data.entity.Movie;
import hu.unideb.movilist.data.repository.MovieRepository;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/movies")
public class MovieController {
    @Autowired
    private MovieRepository movieRepository;


    @GetMapping("")
    public ResponseEntity<List<Movie>> getAllMovies() {
        try {
            List<Movie> movies = movieRepository.findAll();
            return ResponseEntity.ok(movies);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{id}")
    public Movie getMovie(@PathVariable("id") long id) {

        Movie movie = movieRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Movie not found with id: " + id));

        return movie;
    }

    @PostMapping()
    public Movie saveMovie(@RequestBody Movie movie){
        return movieRepository.save(movie);
    }

    @DeleteMapping("/{id}")
    public void deleteMovie(@PathVariable("id") long id){
        movieRepository.deleteById(id);
    }
}
