package hu.unideb.movilist.service;

import hu.unideb.movilist.data.entity.Movie;
import java.util.Optional;

public interface MovieService {
    Optional<Movie> findMovieById(int id);
}
