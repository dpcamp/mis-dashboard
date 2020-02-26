import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user';
import {Apollo} from 'apollo-angular'
import gql from 'graphql-tag'

@Component({
  templateUrl: 'user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: User[];
  selectedUser: User;
  cols: any[];

  constructor(
    private service: UserService, 
    private apollo: Apollo) { }

  ngOnInit() {
    // OLD REST SERVICE
    //this.service.getUsers()
    //   .subscribe(users => this.users = users);

    this.apollo.query({
      query: gql`
      query {
        allUsers {
          first_name
          last_name
          display_name
          user_name
          email
          department
          title
          phones {
            full_number
            extension
          }
          pdq_computers {
            computer_id
            host_name
          }
          service_requests {
            id
            title
          }
        }
      }
      `,
    })
    .subscribe((res:any) => {
      this.users = res.data.allUsers
      console.log(res.data.allUsers)
    })
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
