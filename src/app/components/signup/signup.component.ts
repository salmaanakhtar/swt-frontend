import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';

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

  constructor(private apiService: ApiService, private router: Router, private snackBar: MatSnackBar, private cdr: ChangeDetectorRef) {}

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
        this.usernameError = error.error.error.username;
        this.emailError = error.error.error.email;
        this.cdr.detectChanges();
      });
  }
}
