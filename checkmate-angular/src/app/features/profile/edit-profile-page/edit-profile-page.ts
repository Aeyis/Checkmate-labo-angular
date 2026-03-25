import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MemberService } from '@core/services/member.service';
import { Member } from '@core/models/member.interface';

@Component({
  selector: 'app-edit-profile-page',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-profile-page.html',
  styleUrl: './edit-profile-page.css',
})
export class EditProfilePage implements OnInit {
  private readonly _memberService = inject(MemberService);
  private readonly _router = inject(Router);
  private readonly _fb = inject(FormBuilder);

  member: Member | null = null;

  profileForm = this._fb.group({
    username: [''],
    email: [''],
    password: [''],
    birthdate: [''],
    gender: [''],
  });

  async ngOnInit(): Promise<void> {
    this.member = await this._memberService.getMember();
    this.profileForm.patchValue(this.member);
  }

  async onSubmit(): Promise<void> {
    await this._memberService.updateMember(this.profileForm.value as any);
    this._router.navigate(['/profile']);
  }
}