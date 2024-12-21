import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';


interface Movie {
  movieId: number;
  movieTitle: string;
  movieDescription: string;
  movieReleaseDate: string;
  movieImageUrl: string;
  genre: { id: number; name: string };
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
    featuredMovies: Movie[] = [];
    constructor(private backendService: BackendService, private router: Router, public authService: AuthService) { }

    ngOnInit(): void {
        this.loadFeaturedMovies();
    }

    loadFeaturedMovies(): void {
        this.backendService.getFeaturedMovies().subscribe({
            next: (data: Movie[]) => {
                this.featuredMovies = data;
            },
            error: (error) => {
                console.error('Error fetching featured movies:', error);
            },
        });
    }

    navigateToMovie(movieId: number): void {
        this.router.navigate(['/movies', movieId]);
    }
}
