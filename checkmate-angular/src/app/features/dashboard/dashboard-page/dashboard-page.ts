import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MemberService} from '@core/services/member.service';
import {AuthService} from '@core/services/auth.service';
import {Member} from '@core/models/member.interface';

@Component({
    selector: 'app-dashboard-page',
    imports: [RouterLink],
    templateUrl: './dashboard-page.html',
    styleUrl: './dashboard-page.css',
})
export class DashboardPage implements OnInit {
  private readonly _memberService=inject(MemberService);
  private readonly _authService=inject(AuthService);

  member : Member | null = null;
  isAdmin=this._authService.isAdmin;

  async ngOnInit():Promise<void> {
    this.member = await this._memberService.getMember();

  }
}
