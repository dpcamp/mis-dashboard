import { Component, OnInit } from '@angular/core';
import { User, UsersQueryResponse } from '../../shared/models/user';
import { usersDetailQuery } from '../../shared/queries/users'
import {Apollo, QueryRef} from 'apollo-angular'

@Component({
  templateUrl: 'user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: User[];
  selectedUser: User;
  cols: any[];
  usersDetailQuery: QueryRef<UsersQueryResponse>

  constructor(
    private apollo: Apollo) { }

  ngOnInit() {
    this.usersDetailQuery =  this.apollo.watchQuery({
      query: usersDetailQuery,
    })
    this.usersDetailQuery.valueChanges.subscribe( ({data}:any) => {
      this.users = data.allUsers
    })
      this.cols = [
        { field: 'display_name', header: 'Display Name' },
        { field: 'user_name', header: 'Username' },
        { field: 'email', header: 'Email Address' },
        { field: 'department', header: 'Department' },
        { field: 'title', header: 'Title' }
    ];
  }

}
