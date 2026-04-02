import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
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

  private readonly _currentUrl = toSignal(
    this._router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => this._router.url)
    ),
    { initialValue: this._router.url }
  );

  isAuthPage = computed(() => this._currentUrl().startsWith('/auth'));

  logout(): void {
    this._authService.logout();
    this._router.navigate(['/auth/login']);
  }
}
