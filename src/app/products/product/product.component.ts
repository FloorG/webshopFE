import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, inject, Input, output, EventEmitter } from '@angular/core';
import { Product } from '../product.model';
import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  imports: [CommonModule],
  providers: [DecimalPipe],
})
export class ProductComponent {
  @Input() product!: Product;
  private shoppingCartService = inject(ShoppingCartService);
  selectProduct = output<Product>();

  onPutInCart(selectedProduct: Product) {
    this.shoppingCartService.addToCart(selectedProduct);
  }
}
