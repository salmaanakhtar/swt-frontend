import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  onLoginSubmit(): void {
    this.apiService.login(this.email, this.password)
      .subscribe(response => {
        const { token, user } = response;

        // Store the token and userID in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userID', user.userID);

        console.log('Login successful:', user);
        this.router.navigate(['/home']);
      }, error => {
        console.error('Login failed:', error.error.error);
      });
  }
}
