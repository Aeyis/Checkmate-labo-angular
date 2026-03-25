import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent:() =>
      import('./features/login/login-page/login-page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent:() =>
      import('./features/register/register-page/register-page').then((m) => m.RegisterPage),
  },
];
