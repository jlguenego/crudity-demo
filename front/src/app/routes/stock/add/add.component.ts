import { ArticleService } from 'src/app/services/article.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Article } from 'src/app/interfaces/article';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddComponent implements OnInit {
  faPlus = faPlus;
  faSpinner = faSpinner;

  isSubmitting = false;

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
    this.isSubmitting = true;
    this.articleService.add(this.f.value as Article).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['..'], { relativeTo: this.route });
      },
      error: (err) => {
        this.isSubmitting = false;
        console.log('err: ', err);
      },
    });
  }
}
