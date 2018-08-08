import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../shared/models/user';
import { Phone } from '../../shared/models/phone';
import { UserService } from '../../shared/services/user.service';
import { PhoneService } from '../../shared/services/phone.service';
import { Message } from 'primeng/primeng';
import { Observable } from 'rxjs';
import { PhoneSidebarComponent } from '../../phones/phone-sidebar/phone-sidebar.component';

@Component({
    //selector: 'selector-name',
    templateUrl: 'user-single.component.html'
})

export class UserSingleComponent implements OnInit {
    selectedUser: User;
    users: User[];
    phoneOpened: boolean = true;
    currentExt: number;
    selectedPhone: Phone;
    msgs: Message[] = [];
    user: User;
    data: any = []; 
    constructor(
        private route: ActivatedRoute,
        private router: Router, 
        private service: UserService, 
        private phoneService: PhoneService
        
        ) { }

    ngOnInit() {
        // grab the id from the url
        this.currentExt= this.route.snapshot.params['ext'];
        let id = this.currentExt;
        this.service.getUsers()
        .subscribe(users => this.users = users);   
        // use the userservice to getUser()
        this.loadUser()
            
     }
     loadUser() 
     {
        this.service.getUserExt(this.currentExt)
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
      getUsers() {
        this.service.getUsers()
        .subscribe(users => this.users = users) ;   
      }

      updatePhone() {
        console.log(this.selectedUser.user_name);
        this.phoneService.getPhoneByEXT(this.currentExt)  
        //.do( res => this.data = res)
            .flatMap(dataResults => Observable.from(dataResults))
            .switchMap(phoneID => this.phoneService.phoneUpdateUser(phoneID.id, this.selectedUser.user_name))
            .subscribe(
                  newUser => {
                    //this.successMessage = selectedPhone.message;
                    console.log(`selectedPhone ID: ${newUser}, user_name: ${this.selectedUser.user_name}`)
                    this.show('success', 'Phone Record Updated', `Extension: ${this.currentExt} phone was assigned to ${this.selectedUser.user_name}`);
                    this.loadUser()
                    
                  },
                  err => {
                    //this.errorMessage = err;
                    this.show('error', 'ERROR', `${err}`);
                  }
                  );
              
             ;
        
            
        //this.successMessage = '';
        //this.errorMessage = '';
        


}

  /**
   * Shows the Growl message 
   */

  show(sev: string, sum: string, msg: string) {

    this.msgs = [];
    this.msgs.push({ severity: `${sev}`, summary: `${sum}`, detail: `${msg}` });
  }
}