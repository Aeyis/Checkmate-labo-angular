import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TournamentService } from '@core/services/tournament.service';
import { Tournament } from '@core/models/tournament.interface';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-tournament-list-page',
  imports: [RouterLink],
  templateUrl: './tournament-list-page.html',
  styleUrl: './tournament-list-page.css',
})
export class TournamentListPage implements OnInit {
  private readonly _tournamentService = inject(TournamentService);
  private readonly _authService = inject(AuthService);

  tournaments = signal<Tournament[]>([]);
  isAdmin = this._authService.isAdmin;

  async ngOnInit(): Promise<void> {
    const result = await this._tournamentService.getAll();
    this.tournaments.set(result.data);
  }
  async join(id: number): Promise<void> {
    await this._tournamentService.join(id);
    const result = await this._tournamentService.getAll();
    this.tournaments.set(result.data);
  }
  async leave(id: number): Promise<void> {
    await this._tournamentService.leave(id);
    const result = await this._tournamentService.getAll();
    this.tournaments.set(result.data);
  }
}
