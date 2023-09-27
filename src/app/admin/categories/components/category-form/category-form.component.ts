import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

import { CategoriesService } from './../../../../core/services/categories.service';
import { MyValidators } from './../../../../utils/validators';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  form: FormGroup;
  categoryId: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private storage: AngularFireStorage,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.categoryId = params.id;
      if(this.categoryId) {
        this.getCategory();
      }
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)],
      // MyValidators.validateCategory(this.categoriesService)
    ],
      image: ['', [Validators.required]]
    });
  }

  get name() {
    return this.form.get('name');
  }
  get image() {
    return this.form.get('image');
  }

  save() {
    console.log(this.form);

    if(this.form.valid) {
      if(this.categoryId) {
        this.updateCategory();
      } else {
        this.createCategory();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  private createCategory() {
    const data = this.form.value;
    this.categoriesService.createCategory(data)
    .subscribe(response => {
      console.log(response);
      this.router.navigate(['./admin/categories']);
    });
  }

  private updateCategory() {
    const data = this.form.value;
    this.categoriesService.updateCategory(this.categoryId, data)
    .subscribe(response => {
      console.log(response);
      this.router.navigate(['./admin/categories']);
    });
  }

  private getCategory() {
    console.log('aaaa');

    this.categoriesService.getCategory(this.categoryId)
    .subscribe(response => {
      console.log(response);
      // ASSIGN THE DATA TO THE FORM OBJECT WHERE THE KEYS MATCH
      this.form.patchValue(response);
      // ANOTHER OPTION TO ASSIGN A VALUE FROM RESPONSE DATA
      this.name.setValue(response.name);
    });
  }

  uploadFile(event) {
    const img = event.target.files[0];
    const name = 'category.png';
    const ref = this.storage.ref(name);
    const task = this.storage.upload(name, img);

    task.snapshotChanges()
    .pipe(
      finalize(() => {
        const urlImage$ = ref.getDownloadURL();
        urlImage$.subscribe(url => {
          console.log(url);
          this.image.setValue(url);

        })
      })
    )
    .subscribe();
  }
}
