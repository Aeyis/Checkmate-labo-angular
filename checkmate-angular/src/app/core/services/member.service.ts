import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { firstValueFrom } from 'rxjs';
import { Member, updateMember } from '@core/models/member.interface';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiURL = environment.apiURL;

  getMember(): Promise<Member> {
    return firstValueFrom(this._httpClient.get<Member>(this._apiURL + 'member/me'));
  }

  updateMember(data: updateMember): Promise<Member> {
    return firstValueFrom(this._httpClient.put<Member>(this._apiURL + 'member/me', data));
  }
}
