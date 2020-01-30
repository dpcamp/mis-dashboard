import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/services/user.service'
import { CreateUser } from '../../shared/models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
    
    selector: 'user-onboard-status',
    templateUrl: 'user-onboard-status.component.html',
    styleUrls: ['user-onboard-status.component.scss']
})
export class UserOnboardStatusComponent implements OnInit{
    isAdmin: boolean;
    submittedBy: string;
    users: CreateUser[];
    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
    ){}
    ngOnInit(){
        this.isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
        this.route.queryParams
        .subscribe(params => {
            this.submittedBy = params.submitted_by
        })
        if(this.submittedBy){
            this.userService.getUserForms(`submitted_by=${this.submittedBy}`)
            .subscribe(user =>{
                console.log(user)
                this.users = user.data
            })
        }
        else {
        this.userService.getUserForms()
        .subscribe(user => {
            console.log(user)
            this.users = user.data
        })
    }
    }

}
