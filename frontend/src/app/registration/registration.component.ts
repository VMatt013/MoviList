import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import { Router } from '@angular/router';

import { BackendService } from '../services/backend.service';


interface RegistrationData {
  username: string;
  email: string;
  password: string;
  roleId: number;
}
@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent{


  registrationForm: FormGroup;

 constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,private backendService: BackendService) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onRegistration(): void {
      if (this.registrationForm.valid) {
        const registrationData: RegistrationData = this.registrationForm.value;
        registrationData.roleId = 2;

        this.backendService.addUser(registrationData).subscribe(response => {
        });
      }
  }
}
