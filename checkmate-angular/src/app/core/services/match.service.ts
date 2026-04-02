import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { firstValueFrom } from 'rxjs';
import { MyMatch } from '@core/models/tournament.interface';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiURL = environment.apiURL;

  setResult(matchId: string, result: string): Promise<void> {
    return firstValueFrom(this._httpClient.patch<void>(this._apiURL + 'match/' + matchId + '/result', { result }));
  }

  getMyMatches(): Promise<MyMatch[]> {
    return firstValueFrom(this._httpClient.get<MyMatch[]>(this._apiURL + 'match/me'));
  }
}
