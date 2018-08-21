import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user';

@Component({
  templateUrl: 'user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: User[];
  selectedUser: User;
  cols: any[];

  constructor(private service: UserService) { }

  ngOnInit() {
    this.service.getUsers()
      .subscribe(users => this.users = users);
      this.cols = [
        { field: 'display_name', header: 'Display Name' },
        { field: 'user_name', header: 'Username' },
        { field: 'email', header: 'Email Address' },
        // { field: 'owners',  subfield: '0', header: 'Assigned To' },
        { field: 'department', header: 'Department' },
        { field: 'title', header: 'Title' }
    ];
  }

}
