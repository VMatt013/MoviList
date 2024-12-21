import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private token = sessionStorage.getItem("token");
  private usersUrl = 'api/users';
  private genresUrl = 'api/genres';
  private loginUrl = 'auth/login';
  private registrationUrl = 'auth/registration';
  private moviesUrl = 'api/movies';
  private ordersUrl = 'webshop/orders';
  private productOrdersUrl = 'webshop/product-orders';
  private statusesUrl = 'api/statuses';

  private baseUrl = 'api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(this.usersUrl,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.authService.getToken() ? `Bearer ${this.authService.getToken()}` : '' }})
    }


getGenres(): Observable<any> {
  return this.http.get<any>(this.genresUrl, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken() ? `Bearer ${this.authService.getToken()}` : ''
    }
  });
}

getUser(userId: number | null): Observable<any> {
  return this.http.get<any>(`${this.usersUrl}/${userId}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken() ? `Bearer ${this.authService.getToken()}` : ''
    }
  });
}

addUser(user: any): Observable<string> {
  return this.http.post<string>(this.registrationUrl, user, {
    headers: {
      'Content-Type': 'application/json'
    },
    responseType: 'text' as 'json'
  });
}

deleteUser(userId: number): Observable<void> {
  return this.http.delete<void>(`${this.usersUrl}/${userId}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken() ? `Bearer ${this.authService.getToken()}` : ''
    }
  });
}

updateUser(userId: number, updatedUser: any): Observable<any> {
  return this.http.put<any>(`${this.usersUrl}/${userId}`, updatedUser, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken() ? `Bearer ${this.authService.getToken()}` : ''
    }
  });
}

loginUser(loginData: any): Observable<string> {
  return this.http.post<string>(this.loginUrl, loginData, {
    headers: {
      'Content-Type': 'application/json'
    },
    responseType: 'text' as 'json'
  });
}

getMovies(): Observable<any> {
  return this.http.get<any>(this.moviesUrl, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken() ? `Bearer ${this.authService.getToken()}` : ''
    }
  });
}

getMovie(movieId: number): Observable<any> {
  return this.http.get<any>(`${this.moviesUrl}/${movieId}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken() ? `Bearer ${this.authService.getToken()}` : ''
    }
  });
}

addMovie(movie: any): Observable<any> {
  return this.http.post<any>(this.moviesUrl, movie, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

deleteMovie(movieId: number): Observable<void> {
  return this.http.delete<void>(`${this.moviesUrl}/${movieId}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken() ? `Bearer ${this.authService.getToken()}` : ''
    }
  });
}

updateMovie(movieId: number, updatedMovie: any): Observable<any> {
  return this.http.put<any>(`${this.moviesUrl}/${movieId}`, updatedMovie, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken() ? `Bearer ${this.authService.getToken()}` : ''
    }
  });
}

addToList(movieId: number): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/movies/${movieId}/add-to-list`, {}, {
    headers: {
      'Authorization': this.authService.getToken() ? `Bearer ${this.authService.getToken()}` : ''
    }
  });
}

updateStatus(movieId: number, status: string): Observable<any> {
  return this.http.put<any>(`${this.baseUrl}/movies/${movieId}/status`, { status }, {
    headers: {
      'Authorization': this.authService.getToken() ? `Bearer ${this.authService.getToken()}` : ''
    }
  });
}

updateRating(movieId: number, rating: number): Observable<any> {
  return this.http.put<any>(`${this.baseUrl}/movies/${movieId}/rating`, { rating }, {
    headers: {
      'Authorization': this.authService.getToken() ? `Bearer ${this.authService.getToken()}` : ''
    }
  });
}

getStatuses(): Observable<any> {
  return this.http.get<any>(this.statusesUrl, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken() ? `Bearer ${this.authService.getToken()}` : ''
    }
  });
}

saveUserMovie(payload: any, userId: number, movieId: number): Observable<any> {
  return this.http.put<any>(`/api/userMovies/${userId}/${movieId}`, payload, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken() ? `Bearer ${this.authService.getToken()}` : ''
    }
  });
}

getUserMovie(userId: number, movieId: number): Observable<any> {
  return this.http.get<any>(`/api/userMovies/${userId}/${movieId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken() ? `Bearer ${this.authService.getToken()}` : ''
    }
  });
}

createUserMovie(payload: any, userId: number, movieId: number): Observable<any> {
  return this.http.post<any>(`/api/userMovies`, { ...payload, userId, movieId }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken() ? `Bearer ${this.authService.getToken()}` : ''
    }
  });
}

getUserMoviesByUserId(userId: number): Observable<any[]> {
  return this.http.get<any[]>(`/api/userMovies/${userId}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken() ? `Bearer ${this.authService.getToken()}` : ''
    }
  });
}

getFeaturedMovies(): Observable<any[]> {
  return this.http.get<any[]>(`${this.moviesUrl}/featured`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken() ? `Bearer ${this.authService.getToken()}` : ''
    }
  });
}


deleteUserMovie(userId: number, movieId: number): Observable<void> {
  return this.http.delete<void>(`/api/userMovies/${userId}/${movieId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken() ? `Bearer ${this.authService.getToken()}` : ''
    }
  });
}


}
