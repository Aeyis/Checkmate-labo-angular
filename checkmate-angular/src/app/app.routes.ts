import { Routes } from '@angular/router';
import {isConnectedGuard} from '@core/guards/isConnected.guard';
import {isNotConnectedGuard} from '@core/guards/isNotConnected.guard';
import {adminGuard} from '@core/guards/admin.guard';

export const routes: Routes = [
  {
    path: 'auth/login',
    loadComponent:() =>
      import('@features/auth/login-page/login-page').then((m) => m.LoginPage),
      canActivate:[isNotConnectedGuard],
  },
  {
    path: 'auth/register',
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
    path: 'tournament',
    loadComponent:()=>
      import('@features/tournament/tournament-list-page/tournament-list-page').then((m) => m.TournamentListPage),
  },
  {
    path: 'tournament/:id',
    loadComponent: () =>
      import('@features/tournament/tournament-detail-page/tournament-detail-page').then((m) => m.TournamentDetailPage),
  },
  {
    path: 'admin/members',
    loadComponent: () =>
      import('@features/admin/member-list-page/member-list-page').then((m) => m.MemberListPage),
    canActivate: [isConnectedGuard, adminGuard],
  },
  {
    path: 'admin/members/create',
    loadComponent: () =>
      import('@features/admin/member-create-page/member-create-page').then((m) => m.MemberCreatePage),
    canActivate: [isConnectedGuard, adminGuard],
  },
  {
    path: 'admin/tournament/create',
    loadComponent: () =>
      import('@features/admin/tournament-create-page/tournament-create-page').then((m) => m.TournamentCreatePage),
    canActivate: [isConnectedGuard, adminGuard],
  },
  {
    path: 'admin/tournament/:id',
    loadComponent: () =>
      import('@features/admin/tournament-manage-page/tournament-manage-page').then((m) => m.TournamentManagePage),
    canActivate: [isConnectedGuard, adminGuard],
  },
  {
    path: "**",
    redirectTo: 'not-found',
  },
];
