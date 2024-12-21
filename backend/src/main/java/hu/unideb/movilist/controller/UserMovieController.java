package hu.unideb.movilist.controller;

import hu.unideb.movilist.data.entity.Status;
import hu.unideb.movilist.data.entity.UserMovie;
import hu.unideb.movilist.data.entity.UserMovieId;
import hu.unideb.movilist.service.UserMovieService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/userMovies")
public class UserMovieController {

    @Autowired
    private UserMovieService userMovieService;

    @PostMapping
    public ResponseEntity<UserMovie> createUserMovie(@RequestBody UserMovieDto userMovieDto) {
        UserMovie userMovie = convertToEntity(userMovieDto); // Use conversion method
        UserMovie createdUserMovie = userMovieService.create(userMovie);
        return new ResponseEntity<>(createdUserMovie, HttpStatus.CREATED);
    }

@GetMapping("/{userId}")
    public ResponseEntity<List<UserMovie>> getUserMoviesByUserId(@PathVariable int userId) {
        List<UserMovie> userMovies = userMovieService.getUserMoviesByUserId(userId);
        return new ResponseEntity<>(userMovies, HttpStatus.OK);
    }


@GetMapping("/{userId}/{movieId}")
public ResponseEntity<UserMovieDto> getUserMovie(@PathVariable int userId, @PathVariable int movieId) {
    UserMovieId id = new UserMovieId(userId, movieId);
    UserMovie userMovie = userMovieService.getById(id);

    if (userMovie == null) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    UserMovieDto dto = convertToDto(userMovie); // Use conversion method

    return new ResponseEntity<>(dto, HttpStatus.OK);
}

private UserMovieDto convertToDto(UserMovie userMovie) {
    UserMovieDto dto = new UserMovieDto();
    dto.setUserId(userMovie.getUserId());
    dto.setMovieId(userMovie.getMovieId());
    if (userMovie.getStatus() != null) { // Check for null status
        StatusDto statusDto = new StatusDto();
        statusDto.setId(userMovie.getStatus().getId());
        dto.setStatus(statusDto);
    }
    dto.setRating(userMovie.getRating());
    return dto;
}

    @GetMapping
    public ResponseEntity<List<UserMovie>> getAllUserMovies() {
        List<UserMovie> userMovies = userMovieService.getAll();
        return new ResponseEntity<>(userMovies, HttpStatus.OK);
    }


    @PutMapping("/{userId}/{movieId}")
    public ResponseEntity<UserMovie> updateUserMovie(@PathVariable int userId, @PathVariable int movieId, @RequestBody UserMovieDto userMovieDto) {
        UserMovieId id = new UserMovieId(userId, movieId);
        UserMovie existingUserMovie = userMovieService.getById(id);
        if (existingUserMovie == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        UserMovie userMovie = convertToEntity(userMovieDto);
        userMovie.setUserId(userId);
        userMovie.setMovieId(movieId);
        UserMovie updatedUserMovie = userMovieService.update(userMovie);

        return new ResponseEntity<>(updatedUserMovie, HttpStatus.OK);
    }

@DeleteMapping("/{userId}/{movieId}")
public ResponseEntity<Void> deleteUserMovie(@PathVariable int userId, @PathVariable int movieId) {
    UserMovieId id = new UserMovieId(userId, movieId);
    UserMovie userMovie = userMovieService.getById(id);

    if (userMovie == null) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Return 404 if the UserMovie is not found
    }

    userMovieService.delete(id); // Call the service method to delete the UserMovie
    return new ResponseEntity<>(HttpStatus.NO_CONTENT); // Return 204 No Content on successful deletion
}

    private UserMovie convertToEntity(UserMovieDto userMovieDto) {
        UserMovie userMovie = new UserMovie();
        userMovie.setUserId(userMovieDto.getUserId());
        userMovie.setMovieId(userMovieDto.getMovieId());
        if (userMovieDto.getStatus() != null) { // Check for null status in DTO
            Status status = new Status();
            status.setId(userMovieDto.getStatus().getId());
            userMovie.setStatus(status);
        }
        userMovie.setRating(userMovieDto.getRating());
        return userMovie;
    }

    // DTOs (Inner classes are fine here)
    public static class UserMovieDto {
        private int userId;
        private int movieId;
        private StatusDto status;
        private Integer rating;

        // Getters and setters...
        public int getUserId() { return userId; }
        public void setUserId(int userId) { this.userId = userId; }
        public int getMovieId() { return movieId; }
        public void setMovieId(int movieId) { this.movieId = movieId; }
        public StatusDto getStatus() { return status; }
        public void setStatus(StatusDto status) { this.status = status; }
        public Integer getRating() { return rating; }
        public void setRating(Integer rating) { this.rating = rating; }
    }

    public static class StatusDto {
        private int id;
        // Getters and setters...
        public int getId() { return id; }
        public void setId(int id) { this.id = id; }
    }
}
