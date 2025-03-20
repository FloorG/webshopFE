import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../products/products.service';
import { FormsModule } from '@angular/forms';
import { NewProduct } from './newProduct.model';
import { Category } from '../../products/category.model';
import { CategorysService } from '../../products/categorys.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  private productsService = inject(ProductsService);
  productName = signal('');
  productDescription = signal('');
  productPrice = signal(0);
  productImageUrl = signal('');
  validInputs = signal(true);
  selectedCategory = signal<Category | null>(null);

  categorys = signal<Category[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');

  private categorysService = inject(CategorysService);
  private destroyRef = inject(DestroyRef);

  onCreateProduct() {
    this.validInputs.set(this.validateInputs());
    if (!this.validInputs()) {
      return;
    }

    const newProduct: NewProduct = {
      name: this.productName(),
      description: this.productDescription(),
      price: this.productPrice(),
      imageUrl: this.productImageUrl(),
      category: this.selectedCategory()!,
    };

    this.productsService.createProduct(newProduct).subscribe({
      next: (product) => {
        console.log('Product created: ', product);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.categorysService.loadCategorys().subscribe({
      next: (categorys: any) => {
        this.categorys.set(categorys);
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

  validateInputs() {
    if (
      !this.productName().trim() ||
      !this.productDescription().trim() ||
      !this.productImageUrl().trim() ||
      !this.selectedCategory() ||
      !this.productPrice() ||
      this.productPrice() != 0
    ) {
      return false;
    }
    return true;
  }
}
