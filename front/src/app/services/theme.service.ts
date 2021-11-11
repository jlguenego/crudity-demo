import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme$ = new BehaviorSubject<string>('light');

  constructor() {
    this.syncWithUserPreferences();
    this.theme$.subscribe((theme) => {
      document.body.classList.remove('dark');
      document.body.classList.remove('light');
      document.body.classList.add(theme);
    });
  }

  toggleTheme() {
    if (this.theme$.value === 'light') {
      this.theme$.next('dark');
      return;
    }
    this.theme$.next('light');
  }

  syncWithUserPreferences() {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      this.theme$.next('dark');
    }

    // also watch for user pref changes.
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        const theme = e.matches ? 'dark' : 'light';
        this.theme$.next(theme);
      });
  }
}
