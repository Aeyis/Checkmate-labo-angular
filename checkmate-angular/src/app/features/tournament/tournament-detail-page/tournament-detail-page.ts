import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TournamentService} from '@core/services/tournament.service';
import {AuthService} from '@core/services/auth.service';
import {Tournament} from '@core/models/tournament.interface';

@Component({
    selector: 'app-tournament-detail-page',
    imports: [],
    templateUrl: './tournament-detail-page.html',
    styleUrl: './tournament-detail-page.css',
})
export class TournamentDetailPage implements OnInit {
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _tournamentService=inject(TournamentService);
  private readonly _authService=inject(AuthService);

  tournament: Tournament | null = null;
  isConnected= this._authService.isConnected;

  async ngOnInit(): Promise<void> {
    const id = +this._route.snapshot.params['id'];
    this.tournament = await this._tournamentService.getById(id);
  }
  async join():Promise<void> {
    const id = +this._route.snapshot.params['id'];
    await this._tournamentService.join(id);
  }
  async leave():Promise<void> {
    const id = +this._route.snapshot.params['id'];
    await this._tournamentService.leave(id);
  }
}
