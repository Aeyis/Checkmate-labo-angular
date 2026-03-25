import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env';
import {Tournament, TournamentList} from '@core/models/tournament.interface';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiURL = environment.apiURL;

  getAll(): Promise<TournamentList> {
    return firstValueFrom(this._httpClient.get<TournamentList>(this._apiURL + 'tournament'));
  }

  getById(id: number): Promise<Tournament> {
    return firstValueFrom(this._httpClient.get<Tournament>(this._apiURL + 'tournament/' + id));
  }

  join(id: number): Promise<void> {
    return firstValueFrom(this._httpClient.post<void>(this._apiURL + 'tournament/' + id + '/join', {}));
  }

  leave(id: number): Promise<void> {
    return firstValueFrom(this._httpClient.post<void>(this._apiURL + 'tournament/' + id + '/leave', {}));
  }
}