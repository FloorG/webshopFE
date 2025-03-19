import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { Product } from '../products/product.model';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
  imports: [CommonModule],
  providers: [DecimalPipe],
})
export class ShoppingCartComponent implements OnInit {
  productsInCart = signal<Product[] | undefined>(undefined);
  private shoppingCartService = inject(ShoppingCartService);

  totalPrice = computed(
    () =>
      this.productsInCart()?.reduce((sum, product) => sum + product.price, 0) ||
      0
  );

  ngOnInit() {
    this.shoppingCartService.loadCart();
    this.productsInCart.set(this.shoppingCartService.products);
  }

  onRemoveFromCart(product: Product) {
    this.shoppingCartService.removeProduct(product);
    this.shoppingCartService.loadCart();
    this.productsInCart.set(this.shoppingCartService.products);
  }
}
