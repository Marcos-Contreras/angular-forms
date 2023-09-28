import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';

import { MyValidators } from './../../../../utils/validators';
import { ProductsService } from './../../../../core/services/products/products.service';
import { CategoriesService } from './../../../../core/services/categories.service';

import { Observable } from 'rxjs';
import { Category } from '../../../../core/models/category.model';
import { getLocaleCurrencyCode } from '@angular/common';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  form: FormGroup;
  image$: Observable<any>;
  categoriesOptions: Category[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private storage: AngularFireStorage,
    private categoriesService: CategoriesService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.getCategories();
  }

  saveProduct(event: Event) {
    console.log(this.form.value);

    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.productsService.createProduct(product)
      .subscribe((newProduct) => {
        console.log(newProduct);
        this.router.navigate(['./admin/products']);
      });
    }
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const name = 'image.png';
    const fileRef = this.storage.ref(name);
    const task = this.storage.upload(name, file);

    task.snapshotChanges()
    .pipe(
      finalize(() => {
        this.image$ = fileRef.getDownloadURL();
        this.image$.subscribe(url => {
          console.log(url);
          const fileList = this.images.value as string[];
          this.form.get('images').setValue([...fileList, url]);
        });
      })
    )
    .subscribe();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      images: [Array<string>(), [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      categoryId: ['', [Validators.required]],
      stock: [4, [Validators.required]]
    });

    this.form.get('stock').valueChanges
    .subscribe(value => {
      console.log(value);
    });
  }

  private getCategories() {
    this.categoriesService.getAllCategories()
    .subscribe(response => {
      this.categoriesOptions = response;
    });
  }

  get price() {
    return this.form.get('price');
  }
  get title() {
    return this.form.get('title');
  }
  get images() {
    return this.form.get('images');
  }
  get description() {
    return this.form.get('description');
  }
  get categoryId() {
    return this.form.get('categoryId');
  }
}
