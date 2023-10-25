import {Component, NgIterable} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Type} from "../../enums/type";
import {PasswordValidatorService} from "../../services/password-validator.service";
import {Sex} from "../../enums/sex";
import {User} from "../../interfaces/user";
import {UserService} from "../../services/user-service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  constructor(private validator: PasswordValidatorService, private userService: UserService) {
  }

  user = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*?%;_]).{6,}$/)]
    ),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*?%;_]).{6,}$/)]

    ),
    description: new FormControl(),
    phone: this.getPhoneFormControl(),
    sex: new FormControl(),
    subjects: new FormArray([])
  }, this.validator.passwordValidator)

  getPhoneFormControl(): FormControl {
    return new FormControl('+380',[
      Validators.pattern(/^\+380\d{1,11}$/),
      Validators.minLength(13),
      Validators.maxLength(13)
    ])
  }
  getTypes(): string[] {
    return Object.values(Type)
  }

  isTouchedAndWrong(abstractControl: AbstractControl): boolean {
    return abstractControl.invalid && abstractControl.touched
  }
  isTouchedAndMismatch(abstractControl: AbstractControl): boolean {
    return abstractControl.touched && this.user.getError('passwordMatchError')
  }
  isTouchedAndMissing(abstractControl: AbstractControl): boolean {
    return abstractControl.getError('required') && abstractControl.touched
  }
  deleteSubject(i: number): void {
    this.getSubjects().splice(i, 1)
  }

  phoneHandler(){
    if (!this.user.get('phone')?.value?.startsWith('+380')) {
      this.user.get('phone')?.setValue('+380');
    }
  }
  getSex(): string[] {
    return Object.values(Sex)

  }
  addSubject() : void {
    const formArray = this.user.get('subjects') as FormArray
    formArray.push(new FormControl(''))
  }
  getSubjects() {
    return (this.user.get('subjects') as FormArray).controls;
  }

  onSubmit(): void {

    const controls = this.user.controls;
    const user: User = {
      id: controls.id.value,
      name: controls.name.value ?? '',
      lastname: controls.lastname.value ?? '',
      email: controls.email.value ?? '',
      type: controls.type.value as Type,
      password: controls.password.value ?? '',
      subjects: controls.subjects.value,
      description: controls.description.value,
      sex: controls.sex.value,
      phone: controls.phone.value ?? undefined
    }

    this.userService.addUser(user)
    this.user.controls.subjects = new FormArray([])
    this.user.controls.phone = this.getPhoneFormControl()
    this.user.reset()
  }

}
