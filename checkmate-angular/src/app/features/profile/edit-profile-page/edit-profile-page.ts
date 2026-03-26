import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MemberService } from '@core/services/member.service';
import { Member } from '@core/models/member.interface';
import { strongPasswordValidator } from '@core/validators/strong-password.validator';
import { FormsErrorDisplay } from '@shared/components/forms-error-display/forms-error-display';

@Component({
  selector: 'app-edit-profile-page',
  imports: [ReactiveFormsModule, FormsErrorDisplay],
  templateUrl: './edit-profile-page.html',
  styleUrl: './edit-profile-page.css',
})
export class EditProfilePage implements OnInit {
  private readonly _memberService = inject(MemberService);
  private readonly _router = inject(Router);

  member: Member | null = null;
  errorMessage: string = '';

  username = new FormControl('');
  email = new FormControl('', [Validators.email]);
  password = new FormControl('', [strongPasswordValidator()]);
  birthdate = new FormControl('');
  gender = new FormControl('');

  profileForm = new FormGroup({ username: this.username, email: this.email, password: this.password, birthdate: this.birthdate, gender: this.gender });

  async ngOnInit(): Promise<void> {
    this.member = await this._memberService.getMember();
    this.profileForm.patchValue(this.member);
  }

  async onSubmit(): Promise<void> {
    if (this.profileForm.invalid) return;
    try {
      await this._memberService.updateMember(this.profileForm.value as any);
      await this._router.navigate(['/profile']);
    } catch {
      this.errorMessage = 'Une erreur est survenue lors de la mise à jour.';
    }
  }
}
