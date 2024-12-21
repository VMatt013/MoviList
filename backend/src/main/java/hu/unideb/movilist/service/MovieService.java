package hu.unideb.movilist.service;

import hu.unideb.movilist.data.entity.Movie;
import hu.unideb.movilist.data.repository.MovieRepository;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public List<Movie> getFeaturedMovies() {
        return movieRepository.findTop10ByOrderByMovieIdDesc();
    }
}
