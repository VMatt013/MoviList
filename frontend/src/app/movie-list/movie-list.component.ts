import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendService } from '../services/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators'; // Import switchMap
import { of, forkJoin, Observable } from 'rxjs'; // Import forkJoin and Observable
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];
  errorMessage: string | null = null;
  userMovies: any[] = [];
  userId: number = 0;
  pvUserId: number = 0;
  pvUsername: string = '';

  constructor(private backendService: BackendService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.loadUser();
      this.loadUserMoviesAndMovies();
  }



    navigateToMovie(movieId: number): void {
        this.router.navigate(['/movie', movieId]);
    }

    getUserMovies(): void {
        this.backendService.getUserMoviesByUserId(this.userId).subscribe({
            next: (data: any[]) => {
                this.userMovies = data;
            },
            error: (error) => {
                console.error('Error fetching user movies:', error);
                this.errorMessage = 'Error loading user movies. Please try again later.';
            },
        });
    }

  loadMovies(): void {
    this.userMovies.forEach(movie => {
      this.backendService.getMovie(movie.movieId).subscribe({
        next: (data: any) => {
          this.movies.push(data);
        },
        error: (error) => {
          console.error('Error fetching movie:', error);
          this.errorMessage = 'Error loading movie. Please try again later.';
        },
      });

    });
  }

loadUserMoviesAndMovies(): void {
    this.backendService.getUserMoviesByUserId(this.pvUserId).pipe(
      switchMap((userMovies: any[]) => {
        if (userMovies && userMovies.length > 0) {
          const movieObservables: Observable<any>[] = userMovies.map(movie => this.backendService.getMovie(movie.movieId));
          return forkJoin(movieObservables); // forkJoin the array of Observables
        } else {
          return of([]); // Return an Observable of empty array if no user movies
        }
      })
    ).subscribe({
      next: (data: any[]) => {
        this.movies = data;
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
        this.errorMessage = 'Error loading movies. Please try again later.';
      },
    });
  }

  loadUser(): void {
   this.route.paramMap.pipe( // Use pipe and switchMap
      switchMap(params => {
        this.pvUserId = parseInt(params.get('userId') || '', 10);
        return this.backendService.getUser(this.pvUserId);
      })
    ).subscribe({
      next: (data: any) => {
        this.pvUsername = data.email;
      },
      error: (error) => {
        console.error('Error fetching user:', error);
        this.errorMessage = 'Error loading user. Please try again later.';
      }
    });
  }



}
