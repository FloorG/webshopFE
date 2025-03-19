import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from './category.model';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategorysService {
  private httpClient = inject(HttpClient);
  private rootUrl = 'https://api.gattyspaintings.nl/api/';

  loadCategorys() {
    return this.httpClient.get<Category[]>(this.rootUrl + 'category/all').pipe(
      tap((resData) => resData),
      catchError((error) => {
        console.log(error);
        return throwError(
          () =>
            new Error(
              'Er is iets verkeer gegaan bij het ophalen van de categorys. Probeer het later nog eens'
            )
        );
      })
    );
  }
}
