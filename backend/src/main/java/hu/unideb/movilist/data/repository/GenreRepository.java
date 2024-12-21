package hu.unideb.movilist.data.repository;

import hu.unideb.movilist.data.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Long> {
    // Add custom queries if needed
}
