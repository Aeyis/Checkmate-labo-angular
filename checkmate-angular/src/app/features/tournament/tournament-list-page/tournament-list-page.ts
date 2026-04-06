import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TournamentService } from '@core/services/tournament.service';
import { Tournament } from '@core/models/tournament.interface';
import { AuthService } from '@core/services/auth.service';
import { SpotlightDirective } from '@shared/directives/spotlight.directive';

const SLIDE_INTERVAL_MS = 5000;

@Component({
  selector: 'app-tournament-list-page',
  imports: [RouterLink, DatePipe, SpotlightDirective],
  templateUrl: './tournament-list-page.html',
  styleUrl: './tournament-list-page.css',
})
export class TournamentListPage implements OnInit, OnDestroy {
  private readonly _tournamentService = inject(TournamentService);
  private readonly _authService = inject(AuthService);

  startedTournaments = signal<Tournament[]>([]);
  waitingTournaments = signal<Tournament[]>([]);
  finishedTournaments = signal<Tournament[]>([]);
  expandedTournamentId = signal<number | null>(null);
  visibleFinishedCount = signal(5);
  currentLiveIndex = signal<number>(0);
  progressKey = signal<number>(0);
  isAdmin = this._authService.isAdmin;
  isConnected = this._authService.isConnected;
  errorMessages = signal<Record<number, string>>({});

  progressAnim = computed(() =>
    this.progressKey() % 2 === 0 ? 'slideProgress' : 'slideProgressAlt'
  );

  activeFilter = signal<'all' | 'available' | 'registered'>('all');
  waitingPage = signal(0);
  waitingDirection = signal<'next' | 'prev'>('next');

  filteredWaiting = computed(() => {
    const f = this.activeFilter();
    const t = this.waitingTournaments();
    if (f === 'registered') return t.filter(x => x.isRegistered);
    if (f === 'available') return t.filter(x => !x.isRegistered);
    return t;
  });

  currentPageTournaments = computed(() => {
    const page = this.waitingPage();
    return this.filteredWaiting().slice(page * 4, page * 4 + 4);
  });

  waitingPageCount = computed(() => Math.ceil(this.filteredWaiting().length / 4));
  canPrevWaiting = computed(() => this.waitingPage() > 0);
  canNextWaiting = computed(() => this.waitingPage() < this.waitingPageCount() - 1);

  setFilter(f: 'all' | 'available' | 'registered'): void {
    this.activeFilter.set(f);
    this.waitingPage.set(0);
  }

  nextWaiting(): void {
    if (this.canNextWaiting()) {
      this.waitingDirection.set('next');
      this.waitingPage.update(p => p + 1);
    }
  }

  prevWaiting(): void {
    if (this.canPrevWaiting()) {
      this.waitingDirection.set('prev');
      this.waitingPage.update(p => p - 1);
    }
  }

  private _timer: ReturnType<typeof setInterval> | null = null;

  async ngOnInit(): Promise<void> {
    const result = await this._tournamentService.getAll();
    this.startedTournaments.set(result.data.filter(t => t.status === 'started'));
    this.waitingTournaments.set(result.data.filter(t => t.status === 'waiting'));
    this.finishedTournaments.set(result.data.filter(t => t.status === 'finished'));
    if (this.startedTournaments().length > 1) {
      this._startTimer();
    }
  }

  ngOnDestroy(): void {
    this._clearTimer();
  }

  goToLive(index: number): void {
    this.currentLiveIndex.set(index);
    this.progressKey.update(k => k + 1);
    this._startTimer();
  }

  private _nextLive(): void {
    const next = (this.currentLiveIndex() + 1) % this.startedTournaments().length;
    this.currentLiveIndex.set(next);
    this.progressKey.update(k => k + 1);
  }

  private _startTimer(): void {
    this._clearTimer();
    this._timer = setInterval(() => this._nextLive(), SLIDE_INTERVAL_MS);
  }

  private _clearTimer(): void {
    if (this._timer) clearInterval(this._timer);
  }

  async join(id: number): Promise<void> {
    try {
      await this._tournamentService.join(id);
      const result = await this._tournamentService.getAll();
      this.startedTournaments.set(result.data.filter(t => t.status === 'started'));
      this.waitingTournaments.set(result.data.filter(t => t.status === 'waiting'));
      this.finishedTournaments.set(result.data.filter(t => t.status === 'finished'));
    } catch (e) {
      this.errorMessages.update(msgs => ({ ...msgs, [id]: 'Ce tournoi est réservé aux femmes.' }));
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

  showMoreFinished(): void {
    this.visibleFinishedCount.update(n => n + 5);
  }
}
