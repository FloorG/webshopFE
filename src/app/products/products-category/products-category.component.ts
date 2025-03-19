import {
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { map } from 'rxjs';
import { ResolveFn } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-products-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-category.component.html',
  styleUrl: './products-category.component.css',
  providers: [DecimalPipe],
})
export class ProductsCategoryComponent implements OnInit {
  products = signal<Product[] | undefined>(undefined);
  categoryProducts = input.required<Product[]>();
  isFetching = signal(false);
  error = signal('');

  private productsService = inject(ProductsService);
  private destroyRef = inject(DestroyRef);
  constructor(private decimalPipe: DecimalPipe) {}

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.productsService.loadProducts().subscribe({
      next: (products) => {
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

export const resolveCategoryProducts: ResolveFn<Product[]> = (
  activatedRouteSnapshot,
  routerState
) => {
  const productsService = inject(ProductsService);
  return productsService
    .loadProducts()
    .pipe(
      map((products) =>
        products.filter(
          (product) =>
            product.category.id ===
            activatedRouteSnapshot.paramMap.get('categoryId')
        )
      )
    );
};
