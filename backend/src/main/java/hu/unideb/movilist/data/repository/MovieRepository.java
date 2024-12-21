package hu.unideb.movilist.data.repository;

import hu.unideb.movilist.data.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {
        List<Movie> findTop10ByOrderByMovieIdDesc();
}
