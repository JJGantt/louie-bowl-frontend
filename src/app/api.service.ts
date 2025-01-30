import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Example method to check if the user is logged in
  isLoggedIn(): boolean {
    // Implement your login logic, e.g., check for a valid JWT token
    return !!localStorage.getItem('authToken');
  }

  // Example method to check if the user has admin privileges
  isAdmin(): boolean {
    // Implement your admin check logic, e.g., check user roles
    const userRole = localStorage.getItem('userRole');
    return userRole === 'admin';
  }

  // Additional authentication methods (login, logout, etc.) as needed
}
