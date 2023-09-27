// THIS IS A SMART COMPONENT

import { Component, OnInit } from '@angular/core';

import { CategoriesService } from './../../../../core/services/categories.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from './../../../../core/models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  category: Category;

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      if(params.id) {
        this.getCategory(params.id);
      }
    });
  }

  createCategory(data) {
    this.categoriesService.createCategory(data)
    .subscribe(response => {
      console.log(response);
      this.router.navigate(['./admin/categories']);
    });
  }

  updateCategory(data) {
    this.categoriesService.updateCategory(this.category.id, data)
    .subscribe(response => {
      console.log(response);
      this.router.navigate(['./admin/categories']);
    });
  }

  private getCategory(id: string) {
    console.log('aaaa');

    this.categoriesService.getCategory(id)
    .subscribe(response => {
      console.log(response);
      this.category = response;
      // ASSIGN THE DATA TO THE FORM OBJECT WHERE THE KEYS MATCH
      // this.form.patchValue(response);
      // ANOTHER OPTION TO ASSIGN A VALUE FROM RESPONSE DATA
      // this.name.setValue(response.name);
    });
  }
}
