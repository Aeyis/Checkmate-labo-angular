import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { UserRole } from '@core/enums/user-role.enum';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { JwtDecoded, loginResponse, RegisterData } from '@core/models/auth.interface';
import { jwtDecode } from 'jwt-decode';
import { environment } from '@env';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiURL = environment.apiURL;

  private _authToken = signal<string>('');
  authToken = this._authToken.asReadonly();
  private _role = signal<UserRole | null>(null);
  role = this._role.asReadonly();

  isAdmin = computed(() => this.role() === UserRole.Admin);
  isConnected = computed(() => !!this.authToken());

  constructor() {
    effect(() => {
      const token = this._authToken();
      if (!token) {
        localStorage.removeItem('token');
        this._role.set(null);
        return;
      }
      localStorage.setItem('token', token);
      const decoded = jwtDecode<JwtDecoded>(token);
      if (decoded.exp && decoded.exp * 1000 > Date.now()) {
        this._role.set(decoded.role as UserRole);
      } else {
        this._authToken.set('');
      }
    });

    const localToken = localStorage.getItem('token');
    if (localToken) {
      this._authToken.set(localToken);
    }
  }

  async login(email: string, password: string): Promise<void> {
    const response = await firstValueFrom(
      this._httpClient.post<loginResponse>(this._apiURL + 'auth/login', { email, password })
    );
    console.log(response);
    this._authToken.set(response.token);
  }

  async register(userData: RegisterData): Promise<void> {
    await firstValueFrom(this._httpClient.post(this._apiURL + 'member', userData));
  }

  logout() {
    this._authToken.set('');
  }
}
// login();
// register();
// logout();
// localStorage
