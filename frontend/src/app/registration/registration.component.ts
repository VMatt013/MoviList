
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';  // Import `of` to return observable for error handling

interface RegistrationData {
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Import only necessary modules
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
    private backendService: BackendService
  ) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  setToken(response: string): void {
    sessionStorage.setItem('token', response);
    this.successMessage = 'Registration successful!'; // Set success message
  }

  onRegistration(): void {
    if (this.registrationForm.valid) {
      const registrationData: RegistrationData = this.registrationForm.value;

      this.backendService.addUser(registrationData).pipe(
        catchError(err => {
          this.errorMessage = 'Registration failed. Please try again.'; // Set error message
          return of(err); // Return an observable to continue the flow
        })
      ).subscribe({
        next: (response) => {
          console.log('Registration successful!', response);
          this.setToken(response);
          this.router.navigate(['/']); // Navigate to login page
        },
        error: () => {
          console.error('Registration failed');
          // Feedback message is already handled in the catchError
        }
      });
    }
  }
}

