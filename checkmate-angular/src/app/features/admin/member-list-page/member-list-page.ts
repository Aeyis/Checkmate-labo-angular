import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MemberService } from '@core/services/member.service';
import { Member } from '@core/models/member.interface';

@Component({
  selector: 'app-member-list-page',
  imports: [RouterLink],
  templateUrl: './member-list-page.html',
  styleUrl: './member-list-page.css',
})
export class MemberListPage implements OnInit {
  private readonly _memberService = inject(MemberService);

  members: Member[] = [];

  async ngOnInit(): Promise<void> {
    this.members = await this._memberService.getAll();
  }
}