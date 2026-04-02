import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MemberService } from '@core/services/member.service';
import { Member } from '@core/models/member.interface';
import { AuthService } from '@core/services/auth.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-profile-page',
  imports: [RouterLink, DatePipe],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage implements OnInit {
  private readonly _memberService = inject(MemberService);
  private readonly _authService = inject(AuthService);

  member = signal<Member | null>(null);
  isAdmin = this._authService.isAdmin;

  async ngOnInit(): Promise<void> {
    const m = await this._memberService.getMember();
    console.log('member:', m);
    this.member.set(m);
  }
}
