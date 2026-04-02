import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-password-rules',
  imports: [],
  templateUrl: './password-rules.html',
  styleUrl: './password-rules.css',
})
export class PasswordRules {
  value = input<string>('');

  hasUppercase = computed(() => /[A-Z]/.test(this.value()));
  hasLowercase = computed(() => /[a-z]/.test(this.value()));
  hasNumber = computed(() => /[0-9]/.test(this.value()));
  hasSpecialChar = computed(() => /[\W_]/.test(this.value()));
  hasMinLength = computed(() => this.value().length >= 8);
}