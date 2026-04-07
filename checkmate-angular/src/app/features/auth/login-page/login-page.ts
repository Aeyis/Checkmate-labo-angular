import {Component, computed, inject, signal} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsErrorDisplay } from '@shared/components/forms-error-display/forms-error-display';
import { FormCard } from '@shared/components/form-card/form-card';
import { MessageDisplay } from '@shared/components/message-display/message-display';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, FormsErrorDisplay, RouterLink, FormCard, MessageDisplay],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  form = new FormGroup({ email: this.email, password: this.password });
  formStatus = toSignal(this.form.statusChanges, { initialValue: this.form.status });
  isInvalid = computed(() => this.formStatus() === 'INVALID');
  isLoading = signal(false)

  errorMessage: string = '';

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;
    this.isLoading.set(true);
    try {
await this._authService.login(this.email.value!, this.password.value!);
      await this._router.navigate(['/dashboard']);
    } catch {
      this.errorMessage = 'Email ou mot de passe incorrect.';
    } finally {
      this.isLoading.set(false);
    }
  }
}
