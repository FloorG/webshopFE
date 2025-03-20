import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  enteredFirstName = signal('');
  enteredLastName = signal('');
  enteredEmail = signal('');
  enteredPassword = signal('');

  registrationError = signal(false);
  validPassword = signal(true);
  validInputs = signal(true);

  private authService = inject(AuthService);

  onRegister() {
    const password = this.enteredPassword();
    this.validPassword.set(this.validatePassword(password));
    this.validInputs.set(this.validateInputs());

    if (!this.validPassword()) {
      return;
    } else if (!this.validInputs()) {
      return;
    } else {
      const userData = {
        firstName: this.enteredFirstName(),
        lastName: this.enteredLastName(),
        email: this.enteredEmail(),
        password: this.enteredPassword(),
      };

      this.authService.register(userData).subscribe({
        next: (resData) => {
          localStorage.setItem('token', resData.token);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  validateInputs() {
    if (
      !this.enteredFirstName().trim() ||
      !this.enteredLastName().trim() ||
      !this.enteredEmail().trim() ||
      !this.enteredPassword().trim()
    ) {
      return false;
    }
    return true;
  }

  validatePassword(password: string) {
    if (
      password.length < 10 ||
      password.length > 25 ||
      !/[0-9]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/[\W_]/.test(password)
    ) {
      return false;
    }
    return true;
  }
}
