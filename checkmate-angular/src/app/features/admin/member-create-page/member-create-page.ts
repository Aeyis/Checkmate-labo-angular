import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberService } from '@core/services/member.service';
import { strongPasswordValidator } from '@core/validators/strong-password.validator';
import { FormsErrorDisplay } from '@shared/components/forms-error-display/forms-error-display';
import { FormCard } from '@shared/components/form-card/form-card';
import { MessageDisplay } from '@shared/components/message-display/message-display';

@Component({
  selector: 'app-member-create-page',
  imports: [ReactiveFormsModule, FormsErrorDisplay, FormCard, MessageDisplay],
  templateUrl: './member-create-page.html',
  styleUrl: './member-create-page.css',
})
export class MemberCreatePage {
  private readonly _memberService = inject(MemberService);
  private readonly _router = inject(Router);

  username = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, strongPasswordValidator()]);
  birthdate = new FormControl('', [Validators.required]);
  gender = new FormControl('', [Validators.required]);

  form = new FormGroup({ username: this.username, email: this.email, password: this.password, birthdate: this.birthdate, gender: this.gender });

  errorMessage: string = '';

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;
    try {
      await this._memberService.create(this.form.value as any);
      await this._router.navigate(['/admin/members']);
    } catch {
      this.errorMessage = 'Une erreur est survenue lors de la création.';
    }
  }
}
