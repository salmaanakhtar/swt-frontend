import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  usernameError: string = '';
  emailError: string = '';

  constructor(private apiService: ApiService, private router: Router, private snackBar: MatSnackBar) {}

  onSignupSubmit(): void {
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      username: this.username,
      password: this.password
    };
    this.apiService.signup(user)
      .subscribe(response => {
        const { token, user } = response;
        localStorage.setItem('token', token);
        console.log('Signup successful:', user);

        this.snackBar.open('Signup successful!', 'Close', {
          duration: 3000,
        });

        this.router.navigate(['/']);
      }, error => {
        console.error('Signup failed:', error.error.error);
        if (error.error.error === 'Username already exists') {
          this.usernameError = 'Username already exists';
        } else if (error.error.error === 'Email already exists') {
          this.emailError = 'Email already exists';
        }
      });
  }
}
