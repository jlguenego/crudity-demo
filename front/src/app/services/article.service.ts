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
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles$ = new BehaviorSubject<Article[] | undefined>([]);

  constructor(private http: HttpClient) {}

  add(article: Article): Observable<void> {
    return this.http.post<void>('/api/articles', article);
  }

  get(id: string) {
    return this.http.get<Article>('/api/articles/' + id);
  }

  refresh() {
    console.log('refresh');
    return of(undefined).pipe(
      tap(() => {
        console.log('send undefined');
        this.articles$.next(undefined);
      }),
      switchMap(() => timer(0)),
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

  remove(selectedArticles: Set<Article>) {
    const ids = [...selectedArticles].map((a) => a.id);
    return this.http.delete('/api/articles', {
      body: JSON.stringify(ids),
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  rewrite(article: Article) {
    return this.http.put(`/api/articles/${article.id}`, article);
  }
}
