import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import {Router, RouterLink} from '@angular/router';
import { strongPasswordValidator } from '@core/validators/strong-password.validator';
import { FormsErrorDisplay } from '@shared/components/forms-error-display/forms-error-display';
import { PasswordRules } from '@shared/components/password-rules/password-rules';
import { FormCard } from '@shared/components/form-card/form-card';
import { MessageDisplay } from '@shared/components/message-display/message-display';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, FormsErrorDisplay, RouterLink, PasswordRules, FormCard, MessageDisplay],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  username = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, strongPasswordValidator()]);
  birthDate = new FormControl('', [Validators.required]);
  gender = new FormControl('', [Validators.required]);
  elo = new FormControl('', [Validators.required]);

  form = new FormGroup({ username: this.username, email: this.email, password: this.password, gender: this.gender, birthDate: this.birthDate, elo: this.elo });
  showPasswordRules = signal(false);
  errorMessage: string = '';

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;
    try {
      await this._authService.register({
        username: this.username.value!,
        email: this.email.value!,
        password: this.password.value!,
        birthdate: this.birthDate.value!,
        gender: this.gender.value!,
        elo: +this.elo.value!,
      });
      await this._router.navigate(['/auth/login']);
    } catch {
      this.errorMessage = 'Une erreur est survenue lors de l\'inscription.';
    }
  }
}
