import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TournamentService } from '@core/services/tournament.service';
import { Tournament } from '@core/models/tournament.interface';

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

  async ngOnInit(): Promise<void> {
    const id = +this._route.snapshot.params['id'];
    this.tournament.set(await this._tournamentService.getById(id));
  }

  async start(): Promise<void> {
    await this._tournamentService.start(this.tournament()!.id);
    this.tournament.set(await this._tournamentService.getById(this.tournament()!.id));
  }

  async nextRound(): Promise<void> {
    await this._tournamentService.nextRound(this.tournament()!.id);
    this.tournament.set(await this._tournamentService.getById(this.tournament()!.id));
  }

  async delete(): Promise<void> {
    await this._tournamentService.delete(this.tournament()!.id);
    this._router.navigate(['/admin/tournament']);
  }
}
