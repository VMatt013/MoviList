package hu.unideb.movilist.data.repository;

import hu.unideb.movilist.data.entity.UserMovie;
import hu.unideb.movilist.data.entity.UserMovieId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMovieRepository extends JpaRepository<UserMovie, UserMovieId> {
    List<UserMovie> findByUserId(int userId);
}
