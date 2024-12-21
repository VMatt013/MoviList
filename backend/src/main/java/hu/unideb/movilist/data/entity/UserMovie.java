
package hu.unideb.movilist.data.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@IdClass(UserMovieId.class)
@Entity
@Table(name = "userMovies")
public class UserMovie {

    @Id
    @Column(name = "user_id")
    private int userId;

    @Id
    @Column(name = "movie_id")
    private int movieId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "status_id", nullable = false)
    @JsonIgnore 
    private Status status;

    @Column(name = "rating", nullable = true) // Rating can be null
    private Integer rating;

    @Transient
    private UserMovieId id;

    public UserMovie() {}

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public UserMovieId getId() {
        return new UserMovieId(this.userId, this.movieId);
    }

    public void setId(UserMovieId id) {
        this.userId = id.getUserId();
        this.movieId = id.getMovieId();
    }
}

