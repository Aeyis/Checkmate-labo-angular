import { Routes } from '@angular/router';
import {isConnectedGuard} from '@core/guards/isConnected.guard';
import {isNotConnectedGuard} from '@core/guards/isNotConnected.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent:() =>
      import('@features/auth/login-page/login-page').then((m) => m.LoginPage),
      canActivate:[isConnectedGuard],
  },
  {
    path: 'register',
    loadComponent:() =>
      import('@features/auth/register-page/register-page').then((m) => m.RegisterPage),
      canActivate:[isNotConnectedGuard],
  },
  {
    path: 'dashboard',
    loadComponent:() =>
      import('@features/dashboard/dashboard-page/dashboard-page').then((m) => m.DashboardPage),
      canActivate:[isConnectedGuard],
  },
  {
    path: 'forbidden',
    loadComponent:() =>
      import('@features/errors/forbidden-page/forbidden-page').then((m) => m.ForbiddenPage),
  },
  {
    path: 'not-found',
    loadComponent:() =>
      import('@features/errors/not-found-page/not-found-page').then((m) => m.NotFoundPage),
  },
  {
    path: "**",
    redirectTo: 'not-found',
  },
];
