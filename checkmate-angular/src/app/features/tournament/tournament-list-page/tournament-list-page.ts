import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TournamentService } from '@core/services/tournament.service';
import { Tournament } from '@core/models/tournament.interface';
import { AuthService } from '@core/services/auth.service';
import {TournamentStatusPipe} from '@core/pipes/tournament-status-pipe';

@Component({
  selector: 'app-tournament-list-page',
  imports: [RouterLink, TournamentStatusPipe],
  templateUrl: './tournament-list-page.html',
  styleUrl: './tournament-list-page.css',
})
export class TournamentListPage implements OnInit {
  private readonly _tournamentService = inject(TournamentService);
  private readonly _authService = inject(AuthService);

  startedTournaments = signal<Tournament[]>([]);
  waitingTournaments = signal<Tournament[]>([]);
  finishedTournaments = signal<Tournament[]>([]);
  expandedTournamentId = signal<number | null>(null);
  currentLiveIndex = signal<number>(0);
  isAdmin = this._authService.isAdmin;

  errorMessages = signal<Record<number, string>>({});

  async ngOnInit(): Promise<void> {
    const result = await this._tournamentService.getAll();
    this.startedTournaments.set(result.data.filter(t => t.status === 'started'));
    this.waitingTournaments.set(result.data.filter(t => t.status === 'waiting'));
    this.finishedTournaments.set(result.data.filter(t => t.status === 'finished'));
  }
  async join(id: number): Promise<void> {
    try{
      await this._tournamentService.join(id);

    const result = await this._tournamentService.getAll();
      this.startedTournaments.set(result.data.filter(t => t.status === 'started'));
      this.waitingTournaments.set(result.data.filter(t => t.status === 'waiting'));
      this.finishedTournaments.set(result.data.filter(t => t.status === 'finished'));
    } catch(e){
      this.errorMessages.update(msgs => ({ ...msgs, [id]: 'Ce tournoi est réservé aux femmes.'}));
    }
  }
  async leave(id: number): Promise<void> {
    await this._tournamentService.leave(id);
    const result = await this._tournamentService.getAll();
    this.startedTournaments.set(result.data.filter(t => t.status === 'started'));
    this.waitingTournaments.set(result.data.filter(t => t.status === 'waiting'));
    this.finishedTournaments.set(result.data.filter(t => t.status === 'finished'));
  }
  toggleTournament(id: number): void {
    this.expandedTournamentId.set(this.expandedTournamentId() === id ? null : id);
  }

  nextLive(): void {
    if (this.currentLiveIndex() < this.startedTournaments().length - 1) {
      this.currentLiveIndex.update(i => i + 1);
    }
  }

  prevLive(): void {
    if (this.currentLiveIndex() > 0) {
      this.currentLiveIndex.update(i => i - 1);
    }
  }
}
