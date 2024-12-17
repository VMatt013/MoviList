package hu.unideb.movilist.data.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonGetter;


@Entity
@Table(name = "movies")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int movieId;
    @Column(name="title")
    private String movieTitle;
    @Column(name="description")
    private String movieDescription;
    @Column(name="release_date")
    private String movieReleaseDate;

   @OneToOne
    @JoinColumn(name = "genre_id", referencedColumnName = "id")
    private Genre movieGenre;
    

    @JsonGetter("genreName")
    public String getGenreName() {
        return movieGenre.getName();
    }

    @JsonGetter("year")
    public String getYear() {
        return this.movieReleaseDate.substring(0, 4);
    }

    @Column(name="image_url")
    private String movieImageUrl;

    public Movie() {
    }

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }

    public String getMovieTitle() {
        return movieTitle;
    }

    public void setMovieTitle(String movieTitle) {
        this.movieTitle = movieTitle;
    }

    public String getMovieDescription() {
        return movieDescription;
    }

    public void setMovieDescription(String movieDescription) {
        this.movieDescription = movieDescription;
    }

    public String getMovieReleaseDate() {
        return movieReleaseDate;
    }

    public void setMovieReleaseDate(String movieReleaseDate) {
        this.movieReleaseDate = movieReleaseDate;
    }

    public Genre getGenre() {
        return this.movieGenre;
    }
    public void setMovieGenreId(Genre genre) {
        this.movieGenre = genre;
    }

    public String getMovieImageUrl() {
        return movieImageUrl;
    }

    public void setMovieImageUrl(String movieImageUrl) {
        this.movieImageUrl = movieImageUrl;
    }
   }
