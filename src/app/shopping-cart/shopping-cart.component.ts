import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
  imports: [],
})
export class ShoppingCartComponent implements OnInit {
  private shoppingCartService = inject(ShoppingCartService);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {}
}
