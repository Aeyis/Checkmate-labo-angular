import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberService } from '@core/services/member.service';
import { strongPasswordValidator } from '@core/validators/strong-password.validator';

@Component({
  selector: 'app-member-create-page',
  imports: [ReactiveFormsModule],
  templateUrl: './member-create-page.html',
  styleUrl: './member-create-page.css',
})
export class MemberCreatePage {
  private readonly _memberService = inject(MemberService);
  private readonly _router = inject(Router);
  private readonly _fb = inject(FormBuilder);

  form = this._fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, strongPasswordValidator()]],
    birthdate: ['', Validators.required],
    gender: ['', Validators.required],
  });

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;
    await this._memberService.create(this.form.value as any);
    this._router.navigate(['/admin/members']);
  }
}