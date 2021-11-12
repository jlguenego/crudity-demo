import { ArticleService } from 'src/app/services/article.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Article } from 'src/app/interfaces/article';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  f = new FormGroup({
    name: new FormControl('Tournevis', [Validators.required]),
    price: new FormControl(1.2, [Validators.required]),
    qty: new FormControl(50, [Validators.required]),
  });

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  submit() {
    this.articleService.add(this.f.value as Article).subscribe({
      next: () => {
        this.router.navigate(['..'], { relativeTo: this.route });
      },
      error: (err) => {
        console.log('err: ', err);
      },
    });
  }
}
