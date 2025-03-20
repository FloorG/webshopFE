import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account',
  imports: [RouterLink],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit {
  user: User | null = null;
  private authService = inject(AuthService);

  ngOnInit() {
    this.authService.myAccount().subscribe({
      next: (resData) => {
        this.user = resData;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onLogOut() {
    this.authService.logout();
  }
}
