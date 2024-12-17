import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Makes the service available globally without needing a module
})
export class BackendService {
  private token = sessionStorage.getItem("token");
  private usersUrl = 'api/users';
  private moviesUrl = 'api/movies';
  private ordersUrl = 'webshop/orders';
  private productOrdersUrl = 'webshop/product-orders';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(this.usersUrl,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json' }})
    }

  getUser(userId: number | null): Observable<any> {
    return this.http.get<any>(`${this.usersUrl}/${userId}`,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }})
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.usersUrl, user,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }});
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

  getMovies(): Observable<any> {
    return this.http.get<any>(this.moviesUrl,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json' }});
  }

  getMovie(movieId: number): Observable<any> {
    return this.http.get<any>(`${this.moviesUrl}/${movieId}`,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json' }});
  }

  addMovie(movie: any): Observable<any> {
    return this.http.post<any>(this.moviesUrl, movie,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json' }});
  }

  deleteMovie(movieId: number): Observable<void> {
    return this.http.delete<void>(`${this.moviesUrl}/${movieId}`,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json' }});
  }

  updateMovie(movieId: number, updatedMovie: any): Observable<any> {
    return this.http.put(`${this.moviesUrl}/${movieId}`, updatedMovie,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json' }}); // PUT request to update the movie
  }



}

