import { Routes } from '@angular/router';
import { isConnectedGuard } from '@core/guards/isConnected.guard';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./profile-page/profile-page').then((m) => m.ProfilePage),
    canActivate: [isConnectedGuard],
  },
  {
    path: 'edit',
    loadComponent: () =>
      import('./edit-profile-page/edit-profile-page').then((m) => m.EditProfilePage),
    canActivate: [isConnectedGuard],
  },
];
