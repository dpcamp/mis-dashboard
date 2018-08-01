import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service';

@Component({
    //selector: 'selector-name',
    templateUrl: 'user-single.component.html'
})

export class UserSingleComponent implements OnInit {
    selectedUser: User;
    constructor(
        private route: ActivatedRoute,
        private router: Router, 
        private service: UserService 
        ) { }

    ngOnInit() {
        // grab the id from the url
        let id = this.route.snapshot.params['ext'];

        // use the userservice to getUser()
        this.service.getUserExt(id)
            .subscribe(user => {
                this.selectedUser = user
                console.log(user)
            });
     }

     /**
      * Delete a user
      */

      deleteUser() {
          this.service.deleteUser(this.selectedUser.id)
          .subscribe(data => {
              this.router.navigate(['users']);
          });

      }
}