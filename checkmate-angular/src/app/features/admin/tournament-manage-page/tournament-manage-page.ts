import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TournamentService } from '@core/services/tournament.service';
import {Tournament, Match, PlayerScore} from '@core/models/tournament.interface';

@Component({
  selector: 'app-tournament-manage-page',
  imports: [RouterLink],
  templateUrl: './tournament-manage-page.html',
  styleUrl: './tournament-manage-page.css',
})
export class TournamentManagePage implements OnInit {
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _tournamentService = inject(TournamentService);

  tournament = signal<Tournament | null>(null);
  matches = signal<Match[]>([]);
  scores = signal<PlayerScore[]>([]);

  async ngOnInit(): Promise<void> {
    const id = +this._route.snapshot.params['id'];
    this.tournament.set(await this._tournamentService.getById(id));
    if (this.tournament()!.status === 'started') {
      this.matches.set(await this._tournamentService.getCurrentMatches(id));
    }
  }

  async start(): Promise<void> {
    const id = this.tournament()!.id;
    await this._tournamentService.start(id);
    this.tournament.set(await this._tournamentService.getById(id));
    this.matches.set(await this._tournamentService.getCurrentMatches(id));
  }

  async nextRound(): Promise<void> {
    const id = this.tournament()!.id;
    await this._tournamentService.nextRound(id);
    this.tournament.set(await this._tournamentService.getById(id));
    console.log(this.tournament()!.status);
    this.matches.set(await this._tournamentService.getCurrentMatches(id));

    if (this.matches().length === 0) {
      this.scores.set(await this._tournamentService.getScores(id));
    }
  }

  async delete(): Promise<void> {
    await this._tournamentService.delete(this.tournament()!.id);
    this._router.navigate(['/admin/tournament']);
  }
}
