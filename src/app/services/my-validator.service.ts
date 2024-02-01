import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class MyValidatorService {
  constructor() { }
  static isEmpty(value: any): boolean {
    if (value == '') {
      return false;
    } if (value == null) {
      return false;
    } else if (value.length <= 0) {
      return false;
    }
    return true;
  }

  static Checkname(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let value = control.value;
      let nameExp = new RegExp('[a-zA-Z ]+$');
      if (!this.isEmpty(value)) {
        return {
          invalid: true,
          message: 'Please enter your name'
        };
      } else if (!value.match(nameExp)) {
        return {
          invalid: true,
          message: 'Allow only alphabets(a-z,A-Z)'
        };
      } else {
        return null;
      }
    };
  }

  static Checkemail(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
      let value = control.value;
      const validEmailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!this.isEmpty(value)) {
        return {
          invalid: true,
          message: 'Please enter your email'
        };
      } else if (!value.match(validEmailRegex)) {
        return {
          invalid: true,
          message: 'Please enter a valid email id.'
        };
      } else {
        return null;
      }
    };
  }

  static Checkphone(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let value = control.value;
      const validNumberRegex = /^[0-9]+$/;
      if (!this.isEmpty(value)) {
        return {
          invalid: true,
          message: 'Please enter your phone number'
        };
      } else if (!value.match(validNumberRegex)) {
        return {
          invalid: true,
          message: 'Allow only numbers(0-9)'
        };
      } else if (value.length < 10) {
        return {
          invalid: true,
          message: 'Minimum length is 10'
        };
      } else if (value.length > 10) {
        return {
          invalid: true,
          message: 'Minimum length is 10'
        };
      } else {
        return null;
      }
    };
  }

  static Checkpassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let value = control.value;
      if (!this.isEmpty(value)) {
        return {
          invalid: true,
          message: 'Please enter your password'
        };
      } else if (value.length < 6) {
        return {
          invalid: true,
          message: 'Minimum length is 10'
        };
      } else if (value.length > 10) {
        return {
          invalid: true,
          message: 'Maximum length is 10'
        };
      } else {
        return null;
      }
    };
  }

}
