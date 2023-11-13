import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }
  logout(): void {
    // Clear the local storage
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('token');
    localStorage.removeItem('userID');

    // You can also navigate to a specific route after logout if needed
    // For example, navigate to the home page '/'
    this.router.navigate(['/']);
  }
}
