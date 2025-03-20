import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap, catchError, throwError } from 'rxjs';
import { Product } from '../products/product.model';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  products: any[] = [];

  saveCart(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.products));
  }

  addToCart(addedProduct: any) {
    this.products.push(addedProduct);
    this.saveCart();
  }

  productInCart(product: any): boolean {
    return this.products.findIndex((x: any) => x.id === product.id) > -1;
  }

  loadCart(): void {
    this.products = JSON.parse(localStorage.getItem('cart_items') as any) || [];
  }

  removeProduct(product: any) {
    const index = this.products.findIndex((x: any) => x.id === product.id);

    if (index > -1) {
      this.products.splice(index, 1);
      this.saveCart();
    }
  }

  clearProducts() {
    localStorage.clear();
  }

  private errorService = inject(ErrorService);
  private httpClient = inject(HttpClient);
  private rootUrl = 'https://api.gattyspaintings.nl/api/';

  checkOut(checkOutData: any) {
    return this.httpClient.post(this.rootUrl + 'checkout', checkOutData).pipe(
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
