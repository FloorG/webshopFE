import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShoppingCartService } from '../shopping-cart.service';
import { SuccessModalComponent } from '../../shared/modal/success-modal/success-modal.component';
import { ErrorModalComponent } from '../../shared/modal/error-modal/error-modal.component';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule, SuccessModalComponent, ErrorModalComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  enteredFirstName = signal('');
  enteredLastName = signal('');
  enteredEmail = signal('');
  enteredHouseNumber = signal('');
  enteredAddress = signal('');
  enteredCity = signal('');
  enteredZipCode = signal('');

  successfullyCheckedOut = signal(false);
  unsuccessfullyCheckedOut = signal(false);

  private shoppingCartService = inject(ShoppingCartService);

  onSubmitOrder() {
    this.shoppingCartService.loadCart();

    const orderData = {
      firstName: this.enteredFirstName(),
      lastName: this.enteredLastName(),
      email: this.enteredEmail(),
      address: this.enteredAddress(),
      city: this.enteredCity(),
      zipCode: this.enteredZipCode(),
      houseNumber: this.enteredHouseNumber(),
      items: this.shoppingCartService.products.map((product) => ({
        id: product.id,
        quantity: 1,
      })),
    };

    this.shoppingCartService.checkOut(orderData).subscribe({
      next: (resData) => {
        this.successfullyCheckedOut.set(true);
        this.shoppingCartService.clearProducts();
      },
      error: (error) => {
        this.unsuccessfullyCheckedOut.set(true);
      },
    });
  }

  resetSignals() {
    this.successfullyCheckedOut.set(false);
    this.unsuccessfullyCheckedOut.set(false);
  }
}
