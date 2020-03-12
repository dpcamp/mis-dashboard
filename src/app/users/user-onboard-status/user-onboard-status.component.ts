import { Component, OnInit } from '@angular/core';
import { CreateUser, UserFormsQueryResponse } from '../../shared/models/user';
import { ActivatedRoute } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { from, Subscription } from 'rxjs';


@Component({

    selector: 'user-onboard-status',
    templateUrl: 'user-onboard-status.component.html',
    styleUrls: ['user-onboard-status.component.scss']
})
export class UserOnboardStatusComponent implements OnInit {
    loading: boolean = true;
    getUserForms: any;
    isAdmin: boolean;
    submittedBy: string;
    users: CreateUser[];
    userFormSubscription: Subscription;
    userFormsQuery: QueryRef<UserFormsQueryResponse>
    constructor(
        private route: ActivatedRoute,
        private apollo: Apollo
    ) { }
    ngOnInit() {

        this.isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
        this.route.queryParams
            .subscribe(params => {
                this.submittedBy = params.submitted_by
                this.loading = false;
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
            this.loading = true;
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
        this.userFormsQuery = this.apollo.watchQuery<UserFormsQueryResponse>({
            query: this.getUserForms,
        })
        this.userFormsQuery.valueChanges.subscribe(res => {
                this.users = res.data.allUserForms.forms
                this.loading = false;
            })

    }
   
}

