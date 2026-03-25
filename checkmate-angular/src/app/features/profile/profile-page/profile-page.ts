import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MemberService} from '@core/services/member.service';
import {Member} from '@core/models/member.interface';

@Component({
    selector: 'app-profile-page',
    imports: [RouterLink],
    templateUrl: './profile-page.html',
    styleUrl: './profile-page.css',
})
export class ProfilePage implements OnInit {
  private readonly _memberService = inject(MemberService);

  member: Member | null = null;

  async ngOnInit(): Promise<void> {
    this.member = await this._memberService.getMember();
  }
}
