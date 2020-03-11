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
import { Router } from '@angular/router';

@Component({
  templateUrl: 'user-create.component.html'
})
export class UserCreateComponent implements OnInit {
  isAdmin: boolean;
  users: User[];
  createdUser: CreateUser = {};
  unValidation: UNValidation;
  dnValidation: DNValidation;
  userExistsModal: boolean = false;
  successModal: boolean = false;
  createdModal: boolean = false;
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT
  userForm: FormGroup
  unExists = false;
  dnExists = false;
  constructor(
    private service: UserService,
    private validationService: ValidationService,
    private messageService: MessageService,
    private router: Router

  ) { }

  ngOnInit() {
    this.isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
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
    //this.unValidation = {user_name_exists: false}
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
    this.isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
    if(this.isAdmin){
    this.validateUserName();
    if (this.unExists){
      this.userExistsModal = true;
    }
    else {
    this.createdUser.created_by = localStorage.getItem('user_name'),
    this.createdUser.status = 'completed'
    //console.log(this.newEmp)
    this.submitBtnState = ClrLoadingState.LOADING;
    this.service.createUser(this.createdUser)
      .subscribe(createdUser => {
        //this.show('success', 'User Created', `${this.newEmp.display_name} was successfully created`)
        this.service.updateUserForm(this.createdUser)
        .subscribe(res => res)
        this.submitBtnState = ClrLoadingState.SUCCESS;
        this.createdModal = true
      },
        err => {
          this.show('error', 'Error', `${err}`)
          this.submitBtnState = ClrLoadingState.ERROR;
        })
      }
    }
    else {
      console.log('You didnt say the magic word...')
      this.router.navigate(['users'])
    }
  }

  successButton(){
      //this.successModal = !this.successModal
      this.router.navigate(['/users/onboard-status'], {queryParams: {id: localStorage.getItem('user_name')}})
  }
  createdButton(){
    //this.successModal = !this.successModal
    this.router.navigate(['/users'])
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
      //console.log(`user exists: ${this.unExists}`)
      this.unExists = false;
    }
    if (this.createdUser.user_name) {
      //console.log(`user exists: ${this.unExists}`)
        this.unExists = this.users.some(e => e.user_name === this.createdUser.user_name)

    }
  }
  validateDisplayName() {
    if (this.createdUser.display_name === '') {
      this.dnExists = false;
    }
    if (this.createdUser.display_name) {
      this.dnExists = this.users.some(e => e.display_name === this.createdUser.display_name)
        } else {
          this.dnExists = false;
        }
  }
}

