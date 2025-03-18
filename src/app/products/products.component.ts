import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from './products.service';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  imports: [CommonModule],
  providers: [DecimalPipe],
})
export class ProductsComponent implements OnInit {
  loopArray = Array.from({ length: 10 }, (_, i) => i);

  products = signal<Product[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');
  private productsService = inject(ProductsService);
  private destroyRef = inject(DestroyRef);
  constructor(private decimalPipe: DecimalPipe) {}

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.productsService.loadProducts().subscribe({
      next: (products) => {
        console.log(products);
        this.products.set(products);
      },
      error: (error: Error) => {
        this.error.set(error.message);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
