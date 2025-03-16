import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  imports: [],
})
export class ProductsComponent {
  loopArray = Array.from({ length: 10 }, (_, i) => i);
}
