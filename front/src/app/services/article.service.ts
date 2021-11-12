import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles$ = new BehaviorSubject<Article[] | undefined>([]);

  constructor(private http: HttpClient) {
    this.refresh().subscribe();
  }

  add(article: Article): Observable<void> {
    return this.http.post<void>('/api/articles', article);
  }

  refresh() {
    console.log('refresh');
    return of(undefined).pipe(
      tap(() => {
        console.log('send undefined');
        this.articles$.next(undefined);
      }),
      switchMap(() => timer(2000)),
      switchMap(() => this.http.get<Article[]>('/api/articles')),
      catchError((err) => {
        console.log('err: ', err);
        return of<Article[]>([]);
      }),
      tap((articles) => {
        this.articles$.next(articles);
      })
    );
  }
}
