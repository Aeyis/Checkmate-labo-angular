import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MemberService } from '@core/services/member.service';
import { AuthService } from '@core/services/auth.service';
import { Member } from '@core/models/member.interface';
import { TournamentService } from '@core/services/tournament.service';
import { Tournament } from '@core/models/tournament.interface';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterLink],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage implements OnInit {
  private readonly _memberService = inject(MemberService);
  private readonly _authService = inject(AuthService);
  private readonly _tournamentService = inject(TournamentService);

  tournaments = signal<Tournament[]>([]);
  member = signal<Member | null>(null);
  isAdmin = this._authService.isAdmin;
  myTournaments = signal<Tournament[]>([]);

  async ngOnInit(): Promise<void> {
    const result = await this._tournamentService.getAll();
    this.tournaments.set(result.data.filter(t => t.status !== 'finished').slice(0, 3));
    this.myTournaments.set(result.data.filter(t => t.isRegistered));
    this.member.set(await this._memberService.getMember());
  }
}
