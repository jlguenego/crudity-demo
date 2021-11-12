import { Article } from './../../interfaces/article';
import { ArticleService } from 'src/app/services/article.service';
import { Component, OnInit } from '@angular/core';
import {
  faSync,
  faPlus,
  faTrashAlt,
  faPen,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  faSync = faSync;
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;
  faPen = faPen;

  selectedArticles = new Set<Article>();

  constructor(public articleService: ArticleService) {}

  ngOnInit(): void {
    this.refresh();
  }

  toggle(a: Article) {
    if (this.selectedArticles.has(a)) {
      this.selectedArticles.delete(a);
      return;
    }
    this.selectedArticles.add(a);
  }

  refresh(): void {
    this.articleService.refresh().subscribe();
  }

  remove() {
    this.articleService.remove(this.selectedArticles).subscribe(() => {
      this.selectedArticles.clear();
      this.refresh();
    });
  }
}
