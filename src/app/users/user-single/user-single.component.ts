import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UsersQueryResponse } from '../../shared/models/user';
import { Phone } from '../../shared/models/phone';
import { Message } from 'primeng/primeng';
import { Apollo, QueryRef} from 'apollo-angular'
import {usersQuery, userDetailQuery} from '../../shared/queries/users'
import {updatePhoneOwners} from '../../shared/mutations/phones'

@Component({
    // selector: 'selector-name',
    templateUrl: 'user-single.component.html'
})

export class UserSingleComponent implements OnInit {
    selectedUser: User = {}
    users: User[];
    phoneOpened = true;
    currentExt: number;
    extOwner: string;
    selectedPhone: Phone;
    msg: any;
    user: User;
    data: any = [];
    queryVars: any = {}
    usersQuery: QueryRef<UsersQueryResponse>
    userDetailQuery: QueryRef<UsersQueryResponse>
    userPhoneDetailQuery: QueryRef<UsersQueryResponse>
    constructor(
        private route: ActivatedRoute,
        private apollo: Apollo,

    ) { }

    ngOnInit() {
        if(this.route.snapshot.params['ext'])
        {
        // grab the id from the url
        this.currentExt = this.route.snapshot.params['ext'];
        const id = this.currentExt;

        this.usersQuery = this.apollo.watchQuery({
            query: usersQuery
        })
        this.usersQuery.valueChanges
            .subscribe(({data}:any) => 
            this.users = data.allUsers);
        this.queryVars = {ext: this.currentExt}
        }
        else {
            this.queryVars = {user_name: this.route.snapshot.params['user_name']}

        }
        this.loadUser()

    }
    loadUser() {
        this.userDetailQuery = this.apollo.watchQuery({
            query: userDetailQuery,
            variables: this.queryVars
        })
        this.userDetailQuery.valueChanges
        .subscribe(({data}:any) => {
            this.selectedUser = data.user
        })
    }

    updatePhone() {
        this.apollo.mutate({
            mutation:updatePhoneOwners,
            variables: {ext: this.currentExt, owners: this.extOwner},
            refetchQueries: [{
                query: userDetailQuery,
                variables: this.queryVars
            }]
        }).subscribe(({data}: any) => {

            this.msg = { 
                alert : 'success', 
                message: `Extension: ${data.updatePhoneOwners.extension} was assigned to ${data.updatePhoneOwners.owners[0].display_name}`
            }
            this.phoneOpened = false
        }, (error) =>
        {
            this.msg = { 
                alert : 'danger', 
                message: `Error: ${error}`
            }
        });

    }

}
