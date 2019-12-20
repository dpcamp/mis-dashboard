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
  isAdmin = false;

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
    console.log(this.isAdmin)
  }

  UserAuth() {
    this.authSvc.login()
    /*.subscribe(
      loggedUser => this.loggedUser = loggedUser
    )*/
    .pipe(
      tap(res => {
        console.log(res)
        if (res.is_admin === true) {
          this.isAdmin = true;
          console.log(this.isAdmin)
        }
      }),
      mergeMap(dataresults => of(dataresults)),
    switchMap(loggedUser => this.userService.getUser(loggedUser.user_name))
    )
      .subscribe(currentUser => {
      this.currentUser = currentUser
        if (currentUser.is_admin) {
          this.isAdmin = false;
        } else {
          this.isAdmin = false;
        }

    })
  }
}
