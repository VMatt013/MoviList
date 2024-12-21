import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BackendService } from './services/backend.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title = 'Movilist';
    userId: string = "";
    userRole: string | null = null;
    userName: string | null = null;

  constructor(public authService: AuthService,private router: Router,) {}

    ngOnInit() {
        this.authService.userRole$.subscribe(role => this.userRole = role);
        this.authService.userId$.subscribe(id => this.userId = id);
        this.authService.userName$.subscribe(name => this.userName = name);
    }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}

