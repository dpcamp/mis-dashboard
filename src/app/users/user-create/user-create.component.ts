import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { User, CreateUser } from '../../shared/models/user';
import { UNValidation, DNValidation } from '../../shared/models/validation';
import { UserService } from '../../shared/services/user.service'
import { ValidationService } from '../../shared/services/validation.service'
import { Message } from 'primeng/primeng';
import { ClrLoadingState, Loading } from '@clr/angular'
import { concat } from 'rxjs/operators';

@Component({
  templateUrl: 'user-create.component.html'
})
export class UserCreateComponent implements OnInit {

  users: User[];
  createdUser: CreateUser = {};
  unValidation: UNValidation;
  dnValidation: DNValidation;
  msgs: Message[] = [];
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT
  userForm: FormGroup
  unExists = false;
  dnExists = false;
  constructor(
    private service: UserService,
    private validationService: ValidationService,

  ) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      'user_name': new FormControl(this.createdUser.user_name, [
        Validators.required,
        Validators.minLength(6)
      ]),
      'display_name': new FormControl(this.createdUser.display_name, [
        Validators.required
      ]),
      'first_name': new FormControl(this.createdUser.first_name, [
        Validators.required
      ]),
      'last_name': new FormControl(this.createdUser.last_name, [
        Validators.required
      ])
    });
    this.createdUser = { create_mbx: true, sup_man_execs: false, home_drive: false }
    this.unValidation = {user_name_exists: false}
    this.dnValidation = {display_name_exists: false}
    this.service.getUsers()
      .subscribe(users => this.users = users);
  }

  createUser() {
    console.log(this.createdUser)
    this.submitBtnState = ClrLoadingState.LOADING;
    this.service.createUser(this.createdUser)
      .subscribe(createdUser => {
        this.show('success', 'User Created', `${this.createdUser.display_name} was successfully created`)
        this.submitBtnState = ClrLoadingState.SUCCESS;
      },
        err => {
          this.show('error', 'Error', `${err}`)
          this.submitBtnState = ClrLoadingState.ERROR;
        })
  }
  get user_name() { return this.userForm.get('user_name'); }
  show(sev: string, sum: string, msg: string) {

    this.msgs = [];
    this.msgs.push({ severity: `${sev}`, summary: `${sum}`, detail: `${msg}` });
  }
  concatDisplayName() {
    if (this.createdUser.last_name && this.createdUser.first_name) {
    this.createdUser.display_name = `${this.createdUser.last_name}, ${this.createdUser.first_name}`
    this.createdUser.user_name = `${this.createdUser.last_name
      .substring(0, 6)
      .toUpperCase()}${this.createdUser.first_name
        .substring(0, 1)
        .toUpperCase()}`
        this.validateUserName()
        this.validateDisplayName()
    }
  }
  validateUserName() {
    if (this.createdUser.user_name === '') {
      this.unExists = false;
    }
    if (this.createdUser.user_name) {
    this.validationService.validateUserName({ user_name: this.createdUser.user_name })
      .subscribe(res => {
        this.unValidation = res
        if (res.user_name_exists) {
          this.unExists = true;
        } else {
          this.unExists = false;
        }
      })
    }
  }
  validateDisplayName() {
    if (this.createdUser.display_name === '') {
      this.dnExists = false;
    }
    if (this.createdUser.display_name) {
    this.validationService.validateDisplayName({ display_name: this.createdUser.display_name })
      .subscribe(res => {
        this.dnValidation = res
        console.log(this.dnValidation);
        if (res.display_name_exists) {
          this.dnExists = true;
        } else {
          this.dnExists = false;
        }
        console.log(`dnExists: ${this.dnExists}`)
      })
    }
  }
}

