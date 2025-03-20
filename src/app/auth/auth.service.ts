import { HttpClient } from '@angular/common/http';
import { Injectable, inject, output, signal } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private errorService = inject(ErrorService);
  private httpClient = inject(HttpClient);
  private rootUrl = 'https://api.gattyspaintings.nl/api/';

  userLoggedIn = signal<boolean>(this.isLoggedIn());

  register(userData: any) {
    return this.httpClient
      .post<{ token: string }>(this.rootUrl + 'auth/register', userData)
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(
            () =>
              new Error(
                'Er is iets misgegaan bij het registreren controleer of je al een account hebt of probeer het later nog eens.'
              )
          );
        })
      );
  }

  login(userCredentials: { email: string; password: string }) {
    return this.httpClient
      .post<{ token: string }>(this.rootUrl + 'auth/login', userCredentials)
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(
            () =>
              new Error(
                'Er is iets misgegaan bij het inloggen controlleer je gegevens of probeer het later nog eens.'
              )
          );
        })
      );
  }

  getTokenExpiration(token: string): Date | null {
    if (!token) return null;

    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);

      if (payload.exp) {
        return new Date(payload.exp * 1000);
      }
      return null;
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }

  myAccount(): Observable<User> {
    return this.httpClient.get<User>(this.rootUrl + 'auth/myAccount').pipe(
      catchError((error) => {
        console.error('Fout bij het ophalen van de accountgegevens');
        throw error;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    this.userLoggedIn.set(false);
  }

  isLoggedIn() {
    const expirationDate = localStorage.getItem('expires_at');
    return expirationDate ? new Date(expirationDate) > new Date() : false;
  }

  updateAuthStatus() {
    this.userLoggedIn.set(this.isLoggedIn());
  }
}
