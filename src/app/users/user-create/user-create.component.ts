import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { User, CreateUser } from '../../shared/models/user';
import { UNValidation, DNValidation } from '../../shared/models/validation';
import { UserService } from '../../shared/services/user.service'
import { ValidationService } from '../../shared/services/validation.service'
import {MessageService} from 'primeng/api';
import { ClrLoadingState, ClrLoading } from '@clr/angular'
import {ToastModule} from 'primeng/toast';
import { concat } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: 'user-create.component.html'
})
export class UserCreateComponent implements OnInit {

  users: User[];
  createdUser: CreateUser = {};
  unValidation: UNValidation;
  dnValidation: DNValidation;
  //msgs: <MessageService>[] = [];
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT
  userForm: FormGroup
  unExists = false;
  dnExists = false;
  constructor(
    private service: UserService,
    private validationService: ValidationService,
    private messageService: MessageService

  ) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      'user_name': new FormControl(this.createdUser.user_name, [
        Validators.required,
        Validators.minLength(3)
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
      .subscribe(users => {this.users = users
      console.log(this.users)}
        );
  }

  createUserForm(){
    this.createdUser.submitted_by = localStorage.getItem('user_name')
    console.log(this.createdUser)
    this.service.createUserForm(this.createdUser)
    .subscribe(createdUser => {
      this.show('success', 'Form Saved', `Form for ${createdUser.display_name} was successfully Saved`)
      this.submitBtnState = ClrLoadingState.SUCCESS;
    },
      err => {
        this.show('error', 'Error', `${err}`)
        this.submitBtnState = ClrLoadingState.ERROR;
      })
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

    this.messageService.add({ severity: `${sev}`, summary: `${sum}`, detail: `${msg}` })

  }
  clear() {
    this.messageService.clear();
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

