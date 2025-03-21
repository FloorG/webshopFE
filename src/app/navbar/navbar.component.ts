import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { CategorysService } from '../products/categorys.service';
import { Category } from '../products/category.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [],
})
export class NavbarComponent implements OnInit {
  categorys = signal<Category[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');
  selectedCategory = signal<string | null>(null);
  userRole = signal<string | null>(null);

  private categorysService = inject(CategorysService);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  userLoggedIn = this.authService.userLoggedIn;
  constructor(private router: Router) {}

  ngOnInit() {
    this.isFetching.set(true);
    this.userRole.set(this.authService.getUserRole());
    const subscription = this.categorysService.loadCategorys().subscribe({
      next: (categorys) => {
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
    this.selectedCategory.set(categoryId);
  }

  onLogOut() {
    this.authService.logout();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
