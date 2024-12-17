import {Component, OnInit, Pipe} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {SearchPipe} from './pipes/search.pipe';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, SearchPipe,RouterModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {

  movies: any[] = [];
  newMovie = {id: 0, movieTitle: '', description: '', release_date: '', rating: 0, genre_id: 0, image_url: ''};
  filteredMovies: any[] = [];


  constructor(private backendService: BackendService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.backendService.getMovies().subscribe(
      (data) => {
        this.movies = data;
        this.filteredMovies = [...this.movies];
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
