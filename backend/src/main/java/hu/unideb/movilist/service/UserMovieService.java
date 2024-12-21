package hu.unideb.movilist.service;

import hu.unideb.movilist.data.entity.Status;
import hu.unideb.movilist.data.entity.UserMovie;
import hu.unideb.movilist.data.entity.UserMovieId;
import hu.unideb.movilist.data.repository.StatusRepository;
import hu.unideb.movilist.data.repository.UserMovieRepository;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Important!

@Service
@Transactional // Important for database operations
public class UserMovieService {

    private final UserMovieRepository repository;
    private final StatusRepository statusRepository;

    @Autowired
    public UserMovieService(UserMovieRepository repository, StatusRepository statusRepository) {
        this.repository = repository;
        this.statusRepository = statusRepository;
    }

    public UserMovie create(UserMovie userMovie) {
        if (userMovie == null) {
            throw new IllegalArgumentException("UserMovie cannot be null");
        }

        Status status = Optional.ofNullable(userMovie.getStatus()) // Check if getStatus is null
                .map(s -> statusRepository.findById(s.getId())) // If not null, find by id
                .orElseThrow(() -> new IllegalArgumentException("Status or Status ID must be provided")) // Handle null status
                .orElseThrow(() -> new NoSuchElementException("Status not found")); // Handle status not found in DB

        userMovie.setStatus(status);
        return repository.save(userMovie);
    }

    public UserMovie getById(UserMovieId id) {
        return repository.findById(id).orElse(null);
    }

    public List<UserMovie> getAll() {
        return repository.findAll();
    }

   @Transactional(readOnly = true) // Mark as read-only for efficiency if not modifying data
    public List<UserMovie> getUserMoviesByUserId(int userId) {
        return repository.findByUserId(userId); // Assuming a findByUserId method exists in UserMovieRepository
    } 

    public UserMovie update(UserMovie userMovie) {
        UserMovie existing = getById(userMovie.getId());
        if (existing == null) {
            throw new NoSuchElementException("UserMovie not found with ID: " + userMovie.getId());
        }

        existing.setRating(userMovie.getRating());
        existing.setStatus(userMovie.getStatus()); // Important: Update status as well
        return repository.save(existing);
    }

    public void delete(UserMovieId id) {
        repository.deleteById(id);
    }
}
