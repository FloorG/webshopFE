import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import {
  ProductsCategoryComponent,
  resolveCategoryProducts,
} from './products/products-category/products-category.component';
import { CheckoutComponent } from './shopping-cart/checkout/checkout.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'winkelwagen',
    component: ShoppingCartComponent,
  },
  {
    path: 'afrekenen',
    component: CheckoutComponent,
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
