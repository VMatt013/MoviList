import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BackendService } from './services/backend.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  userRole: string | null = null;
  userId: string | null = null;


  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('role');
    this.userService.isLoggedIn(this.userRole);
  }

}


