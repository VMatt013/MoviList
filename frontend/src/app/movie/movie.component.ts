import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent implements OnInit {
  movie: any;
  movieId: number = 0;

  constructor(private route: ActivatedRoute, private backendService: BackendService) {}

  ngOnInit(): void {
    this.movieId = parseInt(this.route.snapshot.paramMap.get('movieId') || '', 10);

    this.route.paramMap.subscribe(params => {
      const id = params.get('movieId');
      this.movieId = id ? parseInt(id, 10) : 0;
      this.loadMovie();
    });

  }

 loadMovie() {
    this.backendService.getMovie(this.movieId).subscribe(
      (data) => {
        this.movie = data;
        console.log('Movie loaded:', this.movie);
      },
      (error) => {
        console.error('Error fetching movie:', error);
      }
    );
  }
}
