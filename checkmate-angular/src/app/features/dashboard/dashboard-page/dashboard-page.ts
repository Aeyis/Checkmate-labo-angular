import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MemberService } from '@core/services/member.service';
import { AuthService } from '@core/services/auth.service';
import { Member } from '@core/models/member.interface';
import { TournamentService } from '@core/services/tournament.service';
import { MyMatch, Tournament } from '@core/models/tournament.interface';
import {TournamentStatusPipe} from '@core/pipes/tournament-status-pipe';
import { Loading } from '@shared/components/loading/loading';
import {MatchService} from '@core/services/match.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterLink, TournamentStatusPipe, Loading],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage implements OnInit {
  private readonly _memberService = inject(MemberService);
  private readonly _authService = inject(AuthService);
  private readonly _tournamentService = inject(TournamentService);
  private readonly _matchService = inject(MatchService);

  startedTournaments = signal<Tournament[]>([]);
  waitingTournaments = signal<Tournament[]>([]);
  finishedTournaments = signal<Tournament[]>([]);
  member = signal<Member | null>(null);
  isAdmin = this._authService.isAdmin;
  myTournaments = signal<Tournament[]>([]);
  currentLiveIndex = signal<number>(0);
  myMatches = signal<MyMatch[]>([]);
  visibleMatchCount = signal(5);

  async ngOnInit(): Promise<void> {
    const result = await this._tournamentService.getAll();
    this.startedTournaments.set(result.data.filter(t => t.status === 'started'));
    this.waitingTournaments.set(result.data.filter(t => t.status === 'waiting'));
    this.finishedTournaments.set(result.data.filter(t => t.status === 'finished'));
    this.myTournaments.set(result.data.filter(t => t.isRegistered && t.status === 'waiting'));
    this.member.set(await this._memberService.getMember());
    this.myMatches.set(await this._matchService.getMyMatches());
  }
  nextLive(): void{
    if (this.currentLiveIndex() <= this.startedTournaments().length - 1){
      this.currentLiveIndex.update(i => i+1);
    }
  }
  prevLive(): void{
    if (this.currentLiveIndex() > 0){
      this.currentLiveIndex.update(i => i-1);
    }
  }

  showMoreMatches(): void {
    this.visibleMatchCount.update(n => n + 5);
  }
}
