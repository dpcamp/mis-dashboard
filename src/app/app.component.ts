import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, switchMap, catchError, mergeMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User, LoggedUser } from './shared/models/user';
import { UserService } from './shared/services/user.service';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  users: User[];
  loggedUser: LoggedUser;
  currentUser: User;
  cnCopied = false;
  isAdmin: boolean;
  hireCount: number;

  constructor(
    private userService: UserService,
    private router: Router,
    private authSvc: AuthService
  ) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(
        users => this.users = users
      );
    this.UserAuth()
    this.userService.getUserForms('get_status=pending')
    .subscribe(res => {
      this.hireCount = res.count
    })
  }

  UserAuth() {
    this.authSvc.login()
    /*.subscribe(
      loggedUser => this.loggedUser = loggedUser
    )*/
    .pipe(
      tap(res => {
        console.log('result' + JSON.stringify(res))
        localStorage.setItem('user_name', res.user_name)
        localStorage.setItem('isAdmin', res.is_admin)
        this.isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
      }),
      mergeMap(dataresults => of(dataresults)),
    switchMap(loggedUser => this.userService.getUser(loggedUser.user_name))
    )
      .subscribe(currentUser => {
      this.currentUser = currentUser
        // if (currentUser.is_admin) {
        //   this.isAdmin = false;
        // } else {
        //   this.isAdmin = false;
        // }

    })
  }
}
