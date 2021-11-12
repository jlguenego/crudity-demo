import { BehaviorSubject, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles$ = new BehaviorSubject<Article[]>([
    { id: 'a1', name: 'Tournevis', price: 1.4, qty: 340 },
    { id: 'a2', name: 'Pelle', price: 3.45, qty: 120 },
    { id: 'a3', name: 'Pince', price: 2.89, qty: 87 },
    { id: 'a4', name: 'Marteau', price: 10, qty: 45 },
  ]);

  constructor(private http: HttpClient) {
    this.refresh().subscribe();
  }

  refresh() {
    return this.http
      .get<Article[]>('/api/articles')
      .pipe(tap((articles) => this.articles$.next(articles)));
  }
}
