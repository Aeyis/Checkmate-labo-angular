import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MemberService} from '@core/services/member.service';
import {Member} from '@core/models/member.interface';

@Component({
    selector: 'app-edit-profile-page',
    imports: [RouterLink, ReactiveFormsModule],
    templateUrl: './edit-profile-page.html',
    styleUrl: './edit-profile-page.css',
})
export class EditProfilePage {
  private readonly _memberService= inject(MemberService);
  private readonly _router  = inject(Router) ;
  private readonly _fb = inject(FormBuilder);

  member: Member | null = null;

  profileForm=this._fb.group({
    username: [''],
    email: [''],
    password: [''],
    birthdate: [''],
    gender: [''],
  })
/*TODO async ngOnInit(): Promise<void> {
    this.member = await this._memberService.getMember();
    this.profileForm matchValue(this.member);
 }*/
}
