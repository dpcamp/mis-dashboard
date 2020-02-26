import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service'
import { CreateUser } from '../../shared/models/user';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { from, Subscription } from 'rxjs';


@Component({

    selector: 'user-onboard-status',
    templateUrl: 'user-onboard-status.component.html',
    styleUrls: ['user-onboard-status.component.scss']
})
export class UserOnboardStatusComponent implements OnInit {
    getUserForms: any;
    isAdmin: boolean;
    submittedBy: string;
    users: CreateUser[];
    userFormSubscription: Subscription;
    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private apollo: Apollo
    ) { }
    ngOnInit() {

        this.isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
        this.route.queryParams
            .subscribe(params => {
                this.submittedBy = params.submitted_by
            })
        if (this.submittedBy) {
            this.getUserForms = gql`
                    query {
                        allUserForms(submitted_by:"${this.submittedBy}") {
                        forms {
                            id
                            display_name
                            start_date
                            created_by
                            create_user{
                            first_name
                            last_name
                            }
                            status
                            submit_user{
                            first_name
                            last_name
                            }
                            updatedAt
                            createdAt
                                
                            
                        }
                        }
                    }`
        }
        else {
            this.getUserForms = gql`
                    query {
                        allUserForms {
                        forms {
                            id
                                display_name
                            start_date
                            created_by
                            create_user{
                            first_name
                            last_name
                            }
                            status
                            submit_user{
                            first_name
                            last_name
                            }
                            updatedAt
                            createdAt
                                
                            
                        }
                        }

    }`
        }
        this.userFormSubscription = this.apollo.watchQuery<any>({
            query: this.getUserForms,
        })
            .valueChanges
            .subscribe(({ data }) => {
                this.users = data.allUserForms.forms
                console.log(this.users)
            })

    }
    ngOnDestroy(){
    this.userFormSubscription.unsubscribe();
    }
    
}

