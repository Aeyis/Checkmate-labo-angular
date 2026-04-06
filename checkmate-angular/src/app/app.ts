import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavBar } from './shared/layout/nav-bar/nav-bar';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly _router = inject(Router);

  protected readonly title = signal('checkmate-angular');

  private readonly _url = toSignal(
    this._router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => (e as NavigationEnd).urlAfterRedirects)
    ),
    { initialValue: this._router.url }
  );

  protected readonly isAuthPage = computed(() => this._url().startsWith('/auth'));
}
