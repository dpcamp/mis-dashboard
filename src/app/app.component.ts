import { Component, OnInit } from '@angular/core';
import { User, UserQueryResponse, UserFormsQueryResponse } from './shared/models/user';
import { AuthService } from './shared/services/auth.service';
import { Apollo, QueryRef } from 'apollo-angular';
import { userQuery, pendingQuery } from './shared/queries/users'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  authUser: string
  currentUser: User;
  cnCopied = false;
  isAdmin: boolean;
  hireCount: number;

  userQuery: QueryRef<UserQueryResponse>
  pendingQuery: QueryRef<UserFormsQueryResponse>

  constructor(
    private authSvc: AuthService,
    private apollo: Apollo 
  ) { }

  ngOnInit() {
    this.UserAuth()
    this.userQuery = this.apollo.watchQuery({
      query: userQuery,
      variables: {user_name: localStorage.getItem('user_name')}
    });
    this.userQuery.valueChanges.subscribe(res => {
    this.currentUser = res.data.user
    })

    this.pendingQuery = this.apollo.watchQuery({
      query: pendingQuery
    })
    this.pendingQuery.valueChanges.subscribe(res => {
      this.hireCount = res.data.allUserForms.pending_count
    })

  }

  UserAuth() {
    this.authSvc.login()
      .subscribe(res => {
        //console.log('result', res)
        localStorage.setItem('user_name', res.user_name)
        localStorage.setItem('isAdmin', res.is_admin)
        this.isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
      })    
  }
}
