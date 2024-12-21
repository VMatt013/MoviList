
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { BackendService } from '../services/backend.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
 errorMessage: string = ''; // To store error messages
  successMessage: string = ''; // To store success messages
  movie: any;
  movieId: number = 0;
  userRole: string | null = null;
  editMode: boolean = false;
  updatedMovie: any = {};
  genres: { id: number; name: string }[] = [];
  statuses: { id: number; name: string }[] = [];
  userId: number = 0;
  isInList: boolean = false;
  userMovie: {
  status: { id: number },
  rating: number | null,
  userId: number,
  movieId: number
} = {
  status: { id: 0 },  // Correctly initialize status as an object with 'id'
  rating: null,
  userId: 0,
  movieId: 0
};

  constructor(private router: Router, private route: ActivatedRoute, private backendService: BackendService, public authService: AuthService) {}

  ngOnInit(): void {
        this.authService.userRole$.subscribe(role => this.userRole = role);
        this.authService.userId$.subscribe(id => this.userId = parseInt(id, 10));

    this.route.paramMap.subscribe(params => {
      const id = params.get('movieId');
      if (id === "add") {
        this.editMode = true;
        this.movieId = 0;
        return;
      }

      this.movieId = id ? parseInt(id, 10) : 0;
    });


    if (!this.editMode) {
      this.loadMovie();
      this.loadStatuses();
      this.isMovieInList();
      }

      this.loadGenres();
    }

  isMovieInList(): void {
       this.backendService.getUserMovie(this.userId, this.movieId).subscribe(
      (data) => {
        this.isInList = true;
        this.userMovie.status.id = data.status.id;
        this.userMovie.rating = data.rating;
        this.userMovie.userId = data.userId;
        this.userMovie.movieId = data.movieId;
      },
      (error) => {
        this.isInList = false;
      }
    );
  }

  addMovieToList(movie: any) {
    this.isInList = true;

    const payload = {
      status: { id: 2 },
      rating: null
    };


    this.backendService.createUserMovie(payload, this.userId, this.movieId).subscribe(
      () => {
        console.log('User movie added successfully');
        this.userMovie.status.id = payload.status.id;
        this.userMovie.rating = payload.rating;
        this.userMovie.userId = this.userId;
        this.userMovie.movieId = this.movieId;

      },
      (error) => {
        console.error('Error adding user movie:', error);
      }
    );
  }

  removeMovieFromList(movieId: number) {
        this.backendService.deleteUserMovie(this.userId, movieId).subscribe(
            () => {
                console.log('User movie removed successfully');
                this.isInList = false;
            },
            (error) => {
                console.error('Error removing user movie:', error);
            }
        );
    }


  loadGenres() {
    this.backendService.getGenres().subscribe(
      (data) => {
        this.genres = data;
      },
      (error) => {
        console.error('Error fetching genres:', error);
      }
    );
  }

  loadStatuses() {
    this.backendService.getStatuses().subscribe(
      (data) => {
        this.statuses = data;
      },
      (error) => {
        console.error('Error fetching statuses:', error);
      }
    );
  }

  loadMovie() {
    this.backendService.getMovie(this.movieId).subscribe(
      (data) => {
        this.movie = data;
      },
      (error) => {
        console.error('Error fetching movie:', error);
      }
    );
  }

  editMovie(movieId: number) {
    this.editMode = true;
    this.updatedMovie = { ...this.movie };

    const currentGenre = this.genres.find(g => g.id === this.movie.genre.id);
    if (currentGenre) {
      this.updatedMovie.genre = currentGenre;
    }
  }

  saveMovie() {
    const payload = {
      movieId: this.updatedMovie.movieId,
      movieTitle: this.updatedMovie.movieTitle,
      movieDescription: this.updatedMovie.movieDescription,
      movieReleaseDate: this.updatedMovie.movieReleaseDate,
      movieImageUrl: this.updatedMovie.movieImageUrl,
      movieGenre: this.updatedMovie.genre
    };

    this.backendService.updateMovie(this.movieId, payload).subscribe(
      () => {
        console.log('Movie updated successfully');
        this.movie = { ...this.updatedMovie };
        this.editMode = false;
        this.loadMovie();
      },
      (error) => {
        console.error('Error updating movie:', error);
      }
    );
  }

  cancelEdit() {
    if (this.movieId === 0) {
      this.router.navigate(['/movies']);
    }
    this.editMode = false;
    this.updatedMovie = {};
  }

  deleteMovie(movieId: number) {
    console.log('Delete movie:', this.movieId);
    this.backendService.deleteMovie(this.movieId).subscribe(
      () => {
        console.log('Movie deleted successfully');
        this.router.navigate(['/movies']);
      },
      (error) => {
        console.error('Error deleting movie:', error);
      }
    );
  }

  updateStatus(movieId: number, status: string) {
    console.log(`Update status for movie ${movieId} to ${status}`);
    this.backendService.updateStatus(movieId, status).subscribe(
      () => console.log('Status updated successfully'),
      (error) => console.error('Error updating status:', error)
    );
  }

  updateRating(movieId: number, rating: number) {
    console.log(`Update rating for movie ${movieId} to ${rating}`);
    this.backendService.updateRating(movieId, rating).subscribe(
      () => console.log('Rating updated successfully'),
      (error) => console.error('Error updating rating:', error)
    );
  }

  saveUserMovie() {
    if (!this.userId || !this.movieId) {
      console.error('User ID or Movie ID is missing.');
      return;
    }
    const payload = {
      status: { id: this.userMovie.status.id },
      rating: this.userMovie.rating || null
    };

    this.backendService.createUserMovie(payload, this.userId, this.movieId).subscribe(
      () => {
        this.successMessage = 'Movie status updated successfully';
        this.errorMessage = '';
        console.log('User movie saved successfully');
      },
      (error) => {
        this.errorMessage = 'Error adding movie to list';
        this.successMessage = '';
        console.error('Error saving user movie:', error);
      }
    );
  }
}

