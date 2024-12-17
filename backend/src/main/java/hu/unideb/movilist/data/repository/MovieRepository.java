package hu.unideb.movilist.data.repository;

import hu.unideb.movilist.data.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    // Add custom queries if needed
}
