import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MemberService } from '@core/services/member.service';
import { Member } from '@core/models/member.interface';
import { SpotlightDirective } from '@shared/directives/spotlight.directive';

@Component({
  selector: 'app-member-list-page',
  imports: [RouterLink, SpotlightDirective],
  templateUrl: './member-list-page.html',
  styleUrl: './member-list-page.css',
})
export class MemberListPage implements OnInit {
  private readonly _memberService = inject(MemberService);

  members = signal<Member[]>([]);
  expandedMemberId = signal<number | null>(null);

  async ngOnInit(): Promise<void> {
    this.members.set(await this._memberService.getAll());
  }

  async delete(id: number, username: string): Promise<void> {
    const confirmed = confirm(`Supprimer le membre ${username} ?`);
    if (!confirmed) return;
    await this._memberService.delete(id);
    this.members.set(this.members().filter( m => m.id !== id));
  }

  toggleMember(id: number): void {
    this.expandedMemberId.set(this.expandedMemberId() === id ? null : id);
  }
}
