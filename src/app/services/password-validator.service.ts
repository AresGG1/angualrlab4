import { Injectable } from '@angular/core';
import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class PasswordValidatorService {

  constructor() { }

  passwordValidator: ValidatorFn = (control:AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const passwordConfirmation = control.get('passwordConfirmation');
    if (password && passwordConfirmation && password.value != passwordConfirmation.value) {
      return {
        passwordMatchError: true
      }
    }
    return null;
  }
}
