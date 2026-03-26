import { Component, inject, OnInit, signal } from '@angular/core';
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

  members = signal<Member[]>([]);

  async ngOnInit(): Promise<void> {
    this.members.set(await this._memberService.getAll());
  }
}
