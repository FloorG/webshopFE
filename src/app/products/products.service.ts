import { inject, Injectable, signal } from '@angular/core';

import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { map, catchError, throwError, tap } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private httpClient = inject(HttpClient);
  private rootUrl = 'https://api.gattyspaintings.nl/api/';

  loadProducts() {
    return this.httpClient.get<Product[]>(this.rootUrl + 'product/all').pipe(
      tap((resData) => resData),
      catchError((error) => {
        console.log(error);
        return throwError(
          () =>
            new Error(
              'Er is iets verkeerd gegaan bij het ophalen van de producten. Probeer het later nog eens.'
            )
        );
      })
    );
  }
}
