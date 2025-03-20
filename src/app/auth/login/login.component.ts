import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RouterLink } from '@angular/router';

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
        console.log('yay');
        localStorage.setItem('token', resData.token);
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
