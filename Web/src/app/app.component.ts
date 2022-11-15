import { Component } from '@angular/core';
import { Router } from '@angular/router';
import 'reflect-metadata';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'PortfolioManagementSystemApp';

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    if (this.authService.isLoggedIn()) {
      localStorage.removeItem('access_token');
      this.router.navigate(['/login']);
    }
  }
}
