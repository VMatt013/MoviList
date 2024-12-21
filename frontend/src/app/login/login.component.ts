import { jwtDecode } from 'jwt-decode';
import { jsDocComment } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';


interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = ''; // To store error messages
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private backendService: BackendService,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  setToken(response: string): void{
    sessionStorage.setItem('token', response);

    const decodedToken: any = jwtDecode(response);
    const role = decodedToken.role;

    sessionStorage.setItem('role', role);
    console.log("Role: ", role);

    const id = decodedToken.id;
    sessionStorage.setItem('id', id);
    console.log("ID: ", id);
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const loginData: LoginData = this.loginForm.value;

      this.backendService.loginUser(loginData).subscribe({
        next: (response) => {
          this.authService.setToken(response);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Login failed', err);
          alert('Invalid credentials, please try again.');
        }
      });
    }
  }
}

