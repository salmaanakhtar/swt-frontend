import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router, private snackBar: MatSnackBar) {}
  emailError: string = '';
  passwordError: string = '';

  onLoginSubmit(): void {
    this.emailError = '';
    this.passwordError = '';
    this.apiService.login(this.email, this.password)
      .subscribe(response => {
        const { token, user } = response;

        // Store the token and userID in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userID', user.userID);
        console.log('Login successful:', user);

        this.snackBar.open('Login successful!', 'Close', {
          duration: 3000,
        });

        this.router.navigate(['/home']);

      }, error => {
        this.snackBar.open('Invalid email or password', 'Close', {
          duration: 3000,
        });
      });
  }
}
