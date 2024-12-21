package hu.unideb.movilist.service;

import hu.unideb.movilist.data.entity.Movie;
import hu.unideb.movilist.data.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MovieServiceImpl implements MovieService {

    private final MovieRepository movieRepository;

    @Autowired
    public MovieServiceImpl(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @Override
    public Optional<Movie> findMovieById(int id) {
        return movieRepository.findById(id);
    }
}
