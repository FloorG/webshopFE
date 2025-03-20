import { CommonModule, DecimalPipe } from '@angular/common';
import {
  Component,
  inject,
  Input,
  output,
  EventEmitter,
  signal,
  computed,
} from '@angular/core';
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
  productsInCart = signal(this.shoppingCartService.products);

  isInCart(product: Product) {
    return this.shoppingCartService.productInCart(product);
  }

  onSelectProduct(selectedProduct: Product) {
    if (this.isInCart(selectedProduct)) {
      this.shoppingCartService.removeProduct(selectedProduct);
    } else {
      this.shoppingCartService.addToCart(selectedProduct);
    }

    this.productsInCart.set(this.shoppingCartService.products);
  }
}
