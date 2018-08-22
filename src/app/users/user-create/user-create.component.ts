import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, CreateUser } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service'
import { Message } from 'primeng/primeng';
import { ClrLoadingState, Loading } from '@clr/angular'

@Component({
  templateUrl: 'user-create.component.html'
})
export class UserCreateComponent implements OnInit {

  users: User[];
  createdUser: CreateUser = {};
  msgs: Message[] = [];
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT
  constructor(private service: UserService) { }

  ngOnInit() {
    this.createdUser = { create_mbx: true, sup_man_execs: false, home_drive: false }

    this.service.getUsers()
      .subscribe(users => this.users = users);
  }

  CreateUser() {
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

      show(sev: string, sum: string, msg: string) {

        this.msgs = [];
        this.msgs.push({ severity: `${sev}`, summary: `${sum}`, detail: `${msg}` });
    }

}

