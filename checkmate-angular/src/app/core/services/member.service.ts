import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { firstValueFrom } from 'rxjs';
import { Member, MemberDetails, updateMember } from '@core/models/member.interface';
import {RegisterData} from '@core/models/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiURL = environment.apiURL;

  getMember(): Promise<Member> {
    return firstValueFrom(this._httpClient.get<MemberDetails>(this._apiURL + 'member/me'))
      .then(res => res.data);
  }
  updateMember(data: updateMember): Promise<Member> {
    return firstValueFrom(this._httpClient.put<Member>(this._apiURL + 'member/me', data));
  }
  getAll(): Promise<Member[]> {
    return firstValueFrom(this._httpClient.get<Member[]>(this._apiURL + 'member'));
  }

  create(data: RegisterData): Promise<Member> {
    return firstValueFrom(this._httpClient.post<Member>(this._apiURL + 'member', data));
  }
}
