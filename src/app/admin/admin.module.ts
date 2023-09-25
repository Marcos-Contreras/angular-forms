import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';

import { MaterialModule } from './../material/material.module';
import { NavComponent } from './components/nav/nav.component';
import { BasicFormComponent } from './components/basic-form/basic-form.component';


@NgModule({
  declarations: [ NavComponent, BasicFormComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    // THIS NEEDS TO BE IMPLEMENTED IN EACH MODULE IN ORDER TO WORK
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class AdminModule { }
