
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  errorMessage: string = ''; // To store error messages
  successMessage: string = ''; // To store success messages

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private backendService: BackendService,
    private authService: AuthService
  ) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onRegistration(): void {
    if (this.registrationForm.valid) {
      const registrationData = this.registrationForm.value;

      this.backendService.addUser(registrationData).pipe(
        catchError(err => {
          this.errorMessage = 'Registration failed. Please try again.'; // Set error message
          return of(err); // Return an observable to continue the flow
        })
      ).subscribe({
        next: (response) => {
          console.log('Registration successful!', response);
          this.authService.setToken(response); // Use AuthService to set token
          this.successMessage = 'Registration successful!'; // Display success message
          this.errorMessage = ''; // Clear any previous error messages
          setTimeout(() => this.router.navigate(['/']), 2000); // Navigate to the main page after 2 seconds
        },
        error: () => {
          console.error('Registration failed');
          // Feedback message is already handled in the catchError
        }
      });
    } else {
      this.errorMessage = 'Please fill in all fields correctly.';
    }
  }
}

