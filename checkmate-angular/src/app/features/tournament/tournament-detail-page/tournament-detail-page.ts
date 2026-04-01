import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TournamentService } from '@core/services/tournament.service';
import { AuthService } from '@core/services/auth.service';
import { Match, PlayerScore, Tournament } from '@core/models/tournament.interface';
import {TournamentStatusPipe} from '@core/pipes/tournament-status-pipe';

@Component({
  selector: 'app-tournament-detail-page',
  imports: [RouterLink, TournamentStatusPipe],
  templateUrl: './tournament-detail-page.html',
  styleUrl: './tournament-detail-page.css',
})
export class TournamentDetailPage implements OnInit {
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _tournamentService = inject(TournamentService);
  private readonly _authService = inject(AuthService);

  tournament = signal<Tournament | null>(null);
  isConnected = this._authService.isConnected;
  isAdmin = this._authService.isAdmin;
  scores = signal<PlayerScore[]>([]);
  matches = signal<Match[]>([]);
  successMessage = signal<string>('');
  errorMessage = signal<string>('');

  async ngOnInit(): Promise<void> {
    try {
      const id = +this._route.snapshot.params['id'];
      this.tournament.set(await this._tournamentService.getById(id));
      console.log(this.tournament()!.isRegistered);
      if (this.tournament()!.status === 'started') {
        this.scores.set(await this._tournamentService.getScores(id));
        this.matches.set(await this._tournamentService.getCurrentMatches(id));
      }
    } catch (e) {
      console.error('ERREUR:', e);
    }
  }

  async join(): Promise<void> {
    try {
      const id = +this._route.snapshot.params['id'];
    await this._tournamentService.join(id);
    this.tournament.set(await this._tournamentService.getById(id));
    this.successMessage.set('Vous êtes bien inscrit au tournoi !');
    } catch (e) { this.errorMessage.set('Ce tournoi est réservé aux femmes.'); }
  }

  async leave(): Promise<void> {
    const id = +this._route.snapshot.params['id'];
    await this._tournamentService.leave(id);
    this.tournament.set(await this._tournamentService.getById(id));
    this.successMessage.set('Vous êtes bien désinscrit du tournoi. ')
  }
  getResult(result: string | null): string {
    if (result === 'white_win') return '1-0';
    if (result === 'black_win') return '0-1';
    if (result === 'draw') return '½-½';
    return 'En cours';
  }
}
