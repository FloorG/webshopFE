import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  enteredEmail = signal('');
  enteredPassword = signal('');
  validInputs = signal(true);

  private authService = inject(AuthService);
  private router = inject(Router);

  onLogin() {
    this.validInputs.set(this.validateInputs());

    if (!this.validInputs()) {
      return;
    }

    const userCredentials = {
      email: this.enteredEmail(),
      password: this.enteredPassword(),
    };

    this.authService.login(userCredentials).subscribe({
      next: (resData) => {
        localStorage.setItem('token', resData.token);
        const expirationDate = this.authService.getTokenExpiration(
          resData.token
        );
        this.authService.userLoggedIn.set(true);
        if (expirationDate) {
          localStorage.setItem('expires_at', expirationDate.toISOString());
        }
        this.router.navigateByUrl('/mijnAccount');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  validateInputs() {
    if (!this.enteredEmail().trim() || !this.enteredPassword().trim()) {
      return false;
    }
    return true;
  }
}
