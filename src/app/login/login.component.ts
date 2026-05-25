import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login(): void {
    this.error = '';
    if (this.authService.login(this.email.trim(), this.password)) {
      this.router.navigate(['/dashboard']);
      return;
    }
    this.error = 'Invalid email or password. Use admin@grade.com / admin123';
  }
}
