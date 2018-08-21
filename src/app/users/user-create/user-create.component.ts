import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, CreateUser } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service'
import { Message } from 'primeng/primeng';

@Component({
  templateUrl: 'user-create.component.html'
})
export class UserCreateComponent implements OnInit {

  users: User[];
  createdUser: CreateUser = {};
  msgs: Message[] = [];
  constructor(private service: UserService) { }

  ngOnInit() {
    this.createdUser = { create_mbx: true, sup_man_execs: false, home_drive: false }

    this.service.getUsers()
      .subscribe(users => this.users = users);
  }

  CreateUser() {
    console.log(this.createdUser)
    
    this.service.createUser(this.createdUser)
      .subscribe(createdUser => {
        this.show('success', 'User Created', `Phone: ${this.createdUser.display_name} was successfully created`)
      })

      }

      show(sev: string, sum: string, msg: string) {

        this.msgs = [];
        this.msgs.push({ severity: `${sev}`, summary: `${sum}`, detail: `${msg}` });
    }

}

