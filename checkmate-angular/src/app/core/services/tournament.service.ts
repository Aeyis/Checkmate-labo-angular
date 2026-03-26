import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env';
import {CreateTournament, Match, PlayerScore, Tournament, TournamentDetail, TournamentList} from '@core/models/tournament.interface';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiURL = environment.apiURL;

  getAll(): Promise<TournamentList> {
    return firstValueFrom(this._httpClient.get<TournamentList>(this._apiURL + 'tournament'));
  };

  getById(id: number): Promise<Tournament> {
    return firstValueFrom(
      this._httpClient.get<TournamentDetail>(this._apiURL + 'tournament/' + id)
    ).then(res => res.data);
  };

  join(id: number): Promise<void> {
    return firstValueFrom(this._httpClient.post<void>(this._apiURL + 'tournament/' + id + '/join', {}));
  };

  leave(id: number): Promise<void> {
    return firstValueFrom(this._httpClient.post<void>(this._apiURL + 'tournament/' + id + '/leave', {}));
  };

  create(data: CreateTournament): Promise<Tournament> {
    return firstValueFrom(this._httpClient.post<Tournament>(this._apiURL + 'tournament', data));
  };

  delete(id: number): Promise<void> {
    return firstValueFrom(this._httpClient.delete<void>(this._apiURL + 'tournament/' + id));
  };

  start(id: number): Promise<void> {
    return firstValueFrom(this._httpClient.post<void>(this._apiURL + 'tournament/' + id + '/start', {}));
  };

  nextRound(id: number): Promise<void> {
    return firstValueFrom(this._httpClient.patch<void>(this._apiURL + 'tournament/' + id + '/next-round', {}));
  };

  registerPlayer(id: number, memberId: number): Promise<void> {
    return firstValueFrom(this._httpClient.post<void>(this._apiURL + 'tournament/' + id + '/register', { memberId }));
  };

  getScores(id: number): Promise<PlayerScore[]> {
    return firstValueFrom(this._httpClient.get<PlayerScore[]>(this._apiURL + 'tournament/' + id + '/scores'));
  }

  getCurrentMatches(id: number): Promise<Match[]> {
    return firstValueFrom(this._httpClient.get<Match[]>(this._apiURL + 'tournament/' + id + '/match/current'));
  }
}
