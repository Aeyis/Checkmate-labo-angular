import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';
import { FormsErrorDisplay } from '@shared/components/forms-error-display/forms-error-display';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, FormsErrorDisplay],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  form = new FormGroup({ email: this.email, password: this.password });

  errorMessage: string = '';

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;
    try {
      await this._authService.login(this.email.value!, this.password.value!);
      await this._router.navigate(['/dashboard']);
    } catch {
      this.errorMessage = 'Email ou mot de passe incorrect.';
    }
  }
}
