import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme$ = new BehaviorSubject<string>('light');

  constructor() {
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
}
