import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { User } from './shared/models/user';
import { UserService } from './shared/services/user.service';

@Component({
<<<<<<< HEAD
  selector: 'app-root',
=======
  selector: 'my-app',
>>>>>>> 840960a6b6c0072ff6fe83602ec7e5478bb957c8
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  users: User[];

  constructor(
    private userService: UserService, 
    private router: Router
  ) {}

  ngOnInit() {    
    this.userService.getUsers()
      .subscribe(
        users => this.users = users
      );
  }

}