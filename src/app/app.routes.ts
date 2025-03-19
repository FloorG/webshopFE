import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import {
  ProductsCategoryComponent,
  resolveCategoryProducts,
} from './products/products-category/products-category.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'winkelwagen',
    component: ShoppingCartComponent,
  },
  {
    path: 'category/:categoryId',
    component: ProductsCategoryComponent,
    runGuardsAndResolvers: 'always',
    resolve: {
      categoryProducts: resolveCategoryProducts,
    },
  },
];
