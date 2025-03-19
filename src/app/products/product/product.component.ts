import { CommonModule, DecimalPipe } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  Input,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

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
}
