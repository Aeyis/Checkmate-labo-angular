import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TournamentService } from '@core/services/tournament.service';
import { AuthService } from '@core/services/auth.service';
import { Match, PlayerScore, Tournament } from '@core/models/tournament.interface';

@Component({
  selector: 'app-tournament-detail-page',
  imports: [RouterLink],
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

  async ngOnInit(): Promise<void> {
    try {
      const id = +this._route.snapshot.params['id'];
      this.tournament.set(await this._tournamentService.getById(id));
      if (this.tournament()!.status === 'started') {
        this.scores.set(await this._tournamentService.getScores(id));
        this.matches.set(await this._tournamentService.getCurrentMatches(id));
      }
    } catch (e) {
      console.error('ERREUR:', e);
    }
  }

  async join(): Promise<void> {
    const id = +this._route.snapshot.params['id'];
    await this._tournamentService.join(id);
  }

  async leave(): Promise<void> {
    const id = +this._route.snapshot.params['id'];
    await this._tournamentService.leave(id);
  }
}
