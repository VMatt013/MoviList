
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule]
})
export class UsersComponent implements OnInit {
  searchTerm: string = '';
  users: any[] = [];
  filteredUsers: any[] = [];
  userRole: string | null = null;

  constructor(private backendService: BackendService, private router: Router,public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userRole$.subscribe(role => this.userRole = role);
    this.loadUsers();
  }

  // Load the list of users from the backend
  loadUsers(): void {
    this.backendService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.filteredUsers = [...this.users]; // Duplicate the list of users
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // Function to edit user
  editUser(userId: number): void {
    console.log('Editing user with id:', userId);
    // Navigate to the edit user page or open a modal to edit user details
    this.router.navigate([`/edit-user/${userId}`]);
  }

  // Function to delete user
  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.backendService.deleteUser(userId).subscribe(
        () => {
          this.users = this.users.filter(user => user.id !== userId);
          this.filteredUsers = [...this.users];
          console.log('User deleted successfully');
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }
}

