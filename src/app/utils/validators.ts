import { AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { isNumber } from 'util';
import { CategoriesService } from './../core/services/categories.service';

export class MyValidators {

  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    console.log(value);
    if (value > 10000) {
      return {price_invalid: true};
    }
    return null;
  }

  static validPassword(control: AbstractControl) {
    const value = control.value;
    if(!containsNumber(value)) {
      return {invalid_password: true};
    }
    return null;
  }

  static matchPasswords(control: AbstractControl) {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;
    if (password === confirmPassword) {
      return null;
    }
    return {match_password: true};
  }

  // ASYNC VALIDATION WHERE A FUNCTION IS RETURNED
  static validateCategory(service: CategoriesService) {
    return (control: AbstractControl) => {
      const value = control.value;
      return service.checkCategory(value)
      .pipe(
        map((response: any) => {
          const isAvailable = response.isAvailable;
          return ! isAvailable ? {not_available: true} : null
        })
      );
    }
  }
}


function containsNumber(value: string) {
  return value.split('').find(v => isNumber(v)) !== undefined;
}

function isNumber(value: string) {
  return !isNaN(parseInt(value, 10));
}
