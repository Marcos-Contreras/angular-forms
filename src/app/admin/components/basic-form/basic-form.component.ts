import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  form: FormGroup;

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
  ) {
    this.buildForm();
  }

  buildForm() {
    // EVERY FIELD HAS THREE PARAMETERS: INITAL VALUE, SYNC AND ASYNC FUNCTIONS
    this.form = this.formBuilder.group({
      name: [
        '',
        [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z]+$/)]
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      date: [''],
      color: ['#000000'],
      age: [12, [Validators.required, Validators.min(18), Validators.max(100)]],
      category: [''],
      tags: [''],
      agree: [false, [Validators.requiredTrue]],
      gender: [''],
      zone: ['']
    });
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
    if(this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  // GETTERS
  get isNameFieldValid() {
    return this.form.get('name').touched && this.form.get('name').valid;
  }
  get isNameFieldInvalid() {
    return this.form.get('name').touched && this.form.get('name').invalid;
  }
  get isPhoneFieldValid() {
    return this.form.get('phone').touched && this.form.get('phone').valid;
  }
  get isPhoneFieldInvalid() {
    return this.form.get('phone').touched && this.form.get('phone').invalid;
  }
  get isEmailFieldValid() {
    return this.form.get('email').touched && this.form.get('email').valid;
  }
  get isEmailFieldInvalid() {
    return this.form.get('email').touched && this.form.get('email').invalid;
  }
  get isAgeFieldValid() {
    return this.form.get('age').touched && this.form.get('age').valid;
  }
  get isAgeFieldInvalid() {
    return this.form.get('age').touched && this.form.get('age').invalid;
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
