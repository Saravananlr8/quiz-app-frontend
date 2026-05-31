import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(
    private authService: Auth,
    private router: Router
  ) {}
  email: string = '';
  password: string = '';

  onLogin() {
    const loginData = {
    email: this.email,
    password: this.password
  };

  this.authService.login(loginData)
    .subscribe({
      next: (response: any) => {

      localStorage.setItem(
        'token',
        response.token
      );

      this.router.navigate(['/quizzes']);
    },

      error: (error) => {
        console.error(error);
      }
    });
  }
}
