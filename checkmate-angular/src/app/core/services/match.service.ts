import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiURL = environment.apiURL;

  setResult(
    matchId: string,
    result: string,
  ): Promise<void> {
    return firstValueFrom(this._httpClient.patch<void>(this._apiURL + 'match/' + matchId + '/result', { result }));
  }
}
