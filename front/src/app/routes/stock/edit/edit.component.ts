import { ArticleService } from './../../../services/article.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  f = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    qty: new FormControl('', [Validators.required]),
  });
  isLoading = true;
  id = '';

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private router: Router
  ) {
    this.route.queryParams.subscribe((param: Params) => {
      console.log('param: ', param);
      this.articleService.get(param['id']).subscribe({
        next: (article) => {
          this.id = article.id;
          const formValues: Partial<Article> = { ...article };
          delete formValues.id;
          this.f.setValue(formValues);
          this.isLoading = false;
        },
      });
    });
  }

  ngOnInit(): void {}

  submit() {
    const article = this.f.value as Article;
    article.id = this.id;
    this.articleService.rewrite(article).subscribe({
      next: () => {
        this.router.navigate(['..'], { relativeTo: this.route });
      },
    });
  }
}
