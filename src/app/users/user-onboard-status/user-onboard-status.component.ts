import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/services/user.service'
import { CreateUser } from '../../shared/models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
    
    moduleId: module.id,
    selector: 'user-onboard-status',
    templateUrl: 'user-onboard-status.component.html',
    styleUrls: ['user-onboard-status.component.scss']
})
export class UserOnboardStatusComponent implements OnInit{
    submittedBy: string;
    users: CreateUser[];
    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
    ){}
    ngOnInit(){
        this.route.queryParams
        .subscribe(params => {
            this.submittedBy = params.submitted_by
        })
        if(this.submittedBy){
            this.userService.getUserFormSubmittedBy(this.submittedBy)
            .subscribe(user =>{
                console.log(user)
                this.users = user
            })
        }
        else {
        this.userService.getUserForms()
        .subscribe(user => {
            this.users = user.data
        })
    }
    }

}
