import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBar {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  isConnected = this._authService.isConnected;
  isAdmin = this._authService.isAdmin;
  gender = this._authService.gender;

  logout(): void {
    this._authService.logout();
    this._router.navigate(['/auth/login']);
  }
}
