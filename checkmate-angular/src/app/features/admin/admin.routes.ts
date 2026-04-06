import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'members',
    loadComponent: () =>
      import('./member-list-page/member-list-page').then((m) => m.MemberListPage),
  },
  {
    path: 'members/create',
    loadComponent: () =>
      import('./member-create-page/member-create-page').then((m) => m.MemberCreatePage),
  },
  {
    path: 'tournament',
    loadComponent: () =>
      import('./tournament-list-page/tournament-list-page').then((m) => m.TournamentListPage),
  },
  {
    path: 'tournament/create',
    loadComponent: () =>
      import('./tournament-create-page/tournament-create-page').then((m) => m.TournamentCreatePage),
  },
  {
    path: 'tournament/:id',
    loadComponent: () =>
      import('./tournament-manage-page/tournament-manage-page').then((m) => m.TournamentManagePage),
  },
  {
    path: 'match/:matchId',
    loadComponent: () =>
      import('./match-result-page/match-result-page').then((m) => m.MatchResultPage),
  },
];
