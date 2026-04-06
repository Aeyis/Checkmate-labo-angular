import { Routes } from '@angular/router';

export const TOURNAMENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./tournament-list-page/tournament-list-page').then((m) => m.TournamentListPage),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./tournament-detail-page/tournament-detail-page').then((m) => m.TournamentDetailPage),
  },
];
