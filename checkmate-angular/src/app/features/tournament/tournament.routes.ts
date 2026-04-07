import { Routes } from '@angular/router';
import {TournamentListPage} from '@features/tournament/tournament-list-page/tournament-list-page';

export const TOURNAMENT_ROUTES: Routes = [
  {
    path: '',
    component: TournamentListPage,
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./tournament-detail-page/tournament-detail-page').then((m) => m.TournamentDetailPage),
  },
];
