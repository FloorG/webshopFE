import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private errorService = inject(ErrorService);
  private httpClient = inject(HttpClient);
  private rootUrl = 'https://api.gattyspaintings.nl/api/';

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

  login(credentials: { email: string; password: string }) {
    return this.httpClient
      .post<{ token: string }>(this.rootUrl + '/auth/login', credentials)
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
}
