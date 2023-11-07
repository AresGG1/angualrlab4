import {Component, NgIterable, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Type} from "../../enums/type";
import {PasswordValidatorService} from "../../services/password-validator.service";
import {Sex} from "../../enums/sex";
import {User} from "../../interfaces/user";
import {UserService} from "../../services/user-service";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  constructor(
    private validator: PasswordValidatorService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {
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

    this.router.navigate([''])

    this.notificationService.showSuccess("Success")
  }

  ngOnInit(): void {
    //get url and id parameter
    //if id parameter is not null then get user by id
    //and set user to form
    this.route.url.subscribe((url) => {
      const uuid = this.route.snapshot.paramMap.get('uuid')
      if (url && url[0].path === 'edit' && uuid) {
        console.log(uuid);
        const userId = this.route.snapshot.paramMap.get('uuid')

        const user = this.userService.getUserById(userId ?? '')

        if (!user) {
          return
        }
        console.log(user);
        this.fetchUserData(user)
      }
    })

  }

  fetchUserData(user: User): void {
    this.user.controls.id.setValue(user.id ?? '')
    this.user.controls.name.setValue(user.name)
    this.user.controls.lastname.setValue(user.lastname)
    this.user.controls.password.setValue(user.password)
    this.user.controls.passwordConfirmation.setValue(user.password)
    this.user.controls.type.setValue(user.type)
    this.user.controls.phone.setValue(user.phone)
    this.user.controls.email.setValue(user.email)
    this.user.controls.sex.setValue(user.sex)
    this.user.controls.description.setValue(user.description)
    this.user.controls.subjects = new FormArray([])

    user.subjects?.forEach((subject) => {
      (this.user.get('subjects') as FormArray).push(new FormControl(subject))
    })

    console.log(this.user.controls.id.value);

  }

}
