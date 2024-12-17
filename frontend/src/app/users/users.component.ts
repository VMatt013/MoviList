import {Component, OnInit, Pipe} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {SearchPipe} from './pipes/search.pipe';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import { Router } from '@angular/router';


import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true, // Enable standalone mode
  imports: [CommonModule, HttpClientModule, FormsModule, SearchPipe] // Import any required modules

})
export class UsersComponent implements OnInit {
  searchTerm: string = '';
  users: any[] = [];
  newUser = {id: 0, username: '', email: ''};
  filteredUsers: any[] = [];
  currentUserId: number | null = null;
  userRole: string | null = null;

  constructor(private backendService: BackendService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
    this.userRole = sessionStorage.getItem('role');

  }

  loadUsers(): void {
    this.backendService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.filteredUsers = [...this.users];
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}

