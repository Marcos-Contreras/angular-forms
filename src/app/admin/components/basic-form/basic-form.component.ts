import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    email: new FormControl(''),
    phone: new FormControl(''),
    date: new FormControl(''),
    color: new FormControl('#000000'),
    age: new FormControl('12'),
    category: new FormControl(''),
    tags: new FormControl(''),
    agree: new FormControl(false),
    gender: new FormControl(''),
    zone: new FormControl('')
  });

  // FormControl HAS THREE PARAMETERS: INITAL VALUE, SYNC AND ASYNC FUNCTIONS
  // name = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  // email = new FormControl('');
  // phone = new FormControl('');
  // date = new FormControl('');
  // color = new FormControl('#000000');
  // age = new FormControl('12');

  // category = new FormControl();
  // tags = new FormControl();

  // agree = new FormControl(false);
  // gender = new FormControl('');
  // zone = new FormControl('');

  constructor(
    private formBuilder: FormBuilder
  ) { }

  buildForm() {
    
  }

  ngOnInit(): void {
    // REAL TIME LISTENER FOR THE name VARIABLE VALUE
    // EQUIVALENT TO THE WATCH FUNCTION IN VUE
    // this.form.value.name.valueChanges
    // .subscribe(value => {
    //   console.log(value);
    // });
  }

  getNameValue() {
    console.log(this.form.value.name.value);
  }

  save() {
    console.log(this.form.value);

  }

  // GETTERS
  get isNameFieldValid() {
    return this.form.value.name.touched && this.form.value.name.valid;
  }
  get isNameFieldInvalid() {
    return this.form.value.name.touched && this.form.value.name.invalid;
  }
  get name() {
    return this.form.get('name');
  }
  get email() {
    return this.form.get('email');
  }
  get phone() {
    return this.form.get('phone');
  }
  get date() {
    return this.form.get('date');
  }
  get color() {
    return this.form.get('color');
  }
  get age() {
    return this.form.get('age');
  }
  get category() {
    return this.form.get('category');
  }
  get tags() {
    return this.form.get('tags');
  }
  get agree() {
    return this.form.get('agree');
  }
  get gender() {
    return this.form.get('gender');
  }
  get zone() {
    return this.form.get('zone');
  }
}
