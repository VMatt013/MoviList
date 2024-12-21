import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtPayload, jwtDecode } from 'jwt-decode';

interface ExtendedJwtPayload extends JwtPayload {
  role?: string;
  id?: string
  userName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRole = new BehaviorSubject<string | null>(null);
  private userId = new BehaviorSubject<string>("");
  private userName = new BehaviorSubject<string | null>(null);
  private token = new BehaviorSubject<string | null>(null);

  get userRole$(): Observable<string | null> {
    return this.userRole.asObservable();
  }

  get userId$(): Observable<string> {
    return this.userId.asObservable();
  }

    get userName$(): Observable<string | null> {
        return this.userName.asObservable();
    }

  get token$(): Observable<string | null> {
    return this.token.asObservable();
  }

  setToken(token: string) {
    try {
      const decodedToken: ExtendedJwtPayload = jwtDecode(token);
      this.token.next(token);
      this.userRole.next(decodedToken.role || null); // Handle potential undefined
      this.userId.next(decodedToken.id || "");
      this.userName.next(decodedToken.userName || null);
    } catch (error) {
      console.error("Error decoding token:", error);
      this.logout(); // Important: Logout if token is invalid
    }
  }

  isLoggedIn(): boolean {
    return !!this.token.getValue();
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('userName');
    this.token.next(null);
    this.userRole.next(null);
    this.userId.next("");
    this.userName.next(null);
  }

    getRole(): string | null {
        return this.userRole.value;
    }

    getUserId(): string {
        return this.userId.value;
    }

    getUserIdInt(): number {
        return parseInt(this.userId.value);
    }

    getUserName(): string | null {
        return this.userName.value;
    }

    getToken(): string | null { // Add getToken() method
        return this.token.value;
    }
}
