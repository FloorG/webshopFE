import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { CategorysService } from '../products/categorys.service';
import { Category } from '../products/category.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [RouterLink],
})
export class NavbarComponent implements OnInit {
  categorys = signal<Category[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');
  selectedCategory = signal<string | null>(null);

  private categorysService = inject(CategorysService);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.categorysService.loadCategorys().subscribe({
      next: (categorys) => {
        console.log(categorys);
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

  selectCategory(categoryId: string) {
    console.log(categoryId);
    this.selectedCategory.set(categoryId);
  }
}
