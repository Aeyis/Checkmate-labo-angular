import { Routes } from '@angular/router';
import { isNotConnectedGuard } from '@core/guards/isNotConnected.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login-page/login-page').then((m) => m.LoginPage),
    canActivate: [isNotConnectedGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register-page/register-page').then((m) => m.RegisterPage),
    canActivate: [isNotConnectedGuard],
  },
];
