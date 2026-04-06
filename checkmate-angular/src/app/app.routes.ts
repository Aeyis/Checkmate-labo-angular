import { Routes } from '@angular/router';
import { isConnectedGuard } from '@core/guards/isConnected.guard';
import { adminGuard } from '@core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tournament',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('@features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'tournament',
    loadChildren: () =>
      import('@features/tournament/tournament.routes').then((m) => m.TOURNAMENT_ROUTES),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('@features/dashboard/dashboard-page/dashboard-page').then((m) => m.DashboardPage),
    canActivate: [isConnectedGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('@features/profile/profile.routes').then((m) => m.PROFILE_ROUTES),
  },
  {
    path: 'admin',
    canActivate: [isConnectedGuard, adminGuard],
    loadChildren: () =>
      import('@features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path: 'forbidden',
    loadComponent: () =>
      import('@features/errors/forbidden-page/forbidden-page').then((m) => m.ForbiddenPage),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('@features/errors/not-found-page/not-found-page').then((m) => m.NotFoundPage),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
