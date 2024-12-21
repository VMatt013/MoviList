import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(this.usersUrl,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }})
    }

  getGenres(): Observable<any> {
    return this.http.get<any>(this.genresUrl,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }})
    }

  getUser(userId: number | null): Observable<any> {
    return this.http.get<any>(`${this.usersUrl}/${userId}`,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }})
  }

  addUser(user: any): Observable<string> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<any>(this.registrationUrl, user,
      {headers: headers,
       responseType: 'text' as 'json'  // specify response type as 'text'
      });
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.usersUrl}/${userId}`,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }}
    );
  }

  updateUser(userId: number, updatedUser: any): Observable<any> {
    return this.http.put(`${this.usersUrl}/${userId}`, updatedUser,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }}
    ); // PUT request to update the user
  }

  loginUser(loginData: any): Observable<string> {
  const headers = { 'Content-Type': 'application/json' };
  return this.http.post<string>(`${this.loginUrl}`, loginData, {
    headers: headers,
    responseType: 'text' as 'json'  // specify response type as 'text'
  });
}

  getMovies(): Observable<any> {
    return this.http.get<any>(this.moviesUrl,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }})
  }

  getMovie(movieId: number): Observable<any> {
    return this.http.get<any>(`${this.moviesUrl}/${movieId}`,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }})
  }

  addMovie(movie: any): Observable<any> {
    return this.http.post<any>(this.moviesUrl, movie,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json' }});
  }

  deleteMovie(movieId: number): Observable<void> {
    return this.http.delete<void>(`${this.moviesUrl}/${movieId}`,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }})
  }

  updateMovie(movieId: number, updatedMovie: any): Observable<any> {
    return this.http.put(`${this.moviesUrl}/${movieId}`, updatedMovie,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }})
  }


  addToList(movieId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/movies/${movieId}/add-to-list`, {});
  }

  updateStatus(movieId: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/movies/${movieId}/status`, { status });
  }

  updateRating(movieId: number, rating: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/movies/${movieId}/rating`, { rating });
  }

  getStatuses(): Observable<any> {
    return this.http.get<any>(this.statusesUrl,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }})
    }

  saveUserMovie(payload: any,userId: number, movieId: number) {
  return this.http.put(`/api/userMovies/${userId}/${movieId}`, payload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: this.token ? `Bearer ${this.token}` : '',
    },
  });
}

getUserMovie(userId: number, movieId: number): Observable<any> {
  return this.http.get<any>(`/api/userMovies/${userId}/${movieId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: this.token ? `Bearer ${this.token}` : '',
    },
  });
}

createUserMovie(payload: any, userId: number, movieId: number): Observable<any> {
  return this.http.post(`/api/userMovies`, { ...payload, userId, movieId }, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: this.token ? `Bearer ${this.token}` : '',
    },
  });
}

}
