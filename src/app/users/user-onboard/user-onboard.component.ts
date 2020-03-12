import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  FormControl } from '@angular/forms';
import { User, CreateUser, UserFormQueryResponse, UserQueryResponse } from '../../shared/models/user';
import { getUserFormDetail, pendingQuery, usersQuery, dfUserQuery } from '../../shared/queries/users';
import { newUserForm, updateUserForm  } from '../../shared/mutations/users';
import { UNValidation,  } from '../../shared/models/validation';
import { UserService } from '../../shared/services/user.service'
import { ClrLoadingState, ClrForm,  } from '@clr/angular'

import { ActivatedRoute, Router } from '@angular/router';
import {  formatDate } from '@angular/common';
import {UsernameValidator} from '../../shared/validators/username'
import {Apollo, QueryRef} from "apollo-angular"
import { variable } from '@angular/compiler/src/output/output_ast';
@Component({
   
    selector: 'user-onboard',
    templateUrl: 'user-onboard.component.html',
    styleUrls: ['user-onboard.component.scss']
})

export class UserOnboardComponent implements OnInit {
  @ViewChild(ClrForm) form: ClrForm;
    isAdmin: boolean;
    unExists: boolean = false;
    dnExists: boolean = false;
    userExistsModal: boolean = false;
    invalidEmpIdModal: boolean = false;
    successModal: boolean = false;
    createdModal: boolean = false;
    isUserReadOnly: boolean = false;
    isReadOnly: boolean = false;
    isLocked: boolean = false;
    startDate: string;
    users: User[] = [];
    newEmp: CreateUser = {};
    emp_id: string;
    //form: FormGroup;
    userForm: FormGroup;
    submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
    unValidation: UNValidation;
    userQuery: QueryRef<UserQueryResponse>
    userFormQuery: QueryRef<UserFormQueryResponse>
    dfUserQuery: QueryRef<any>

    constructor(

        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        public usernameValidator: UsernameValidator,
        private fb: FormBuilder,
        private apollo: Apollo,


    ){

        this.userForm = this.fb.group({
            display_name:  [ this.newEmp.display_name,
              Validators.required
            ],
            first_name:  [ this.newEmp.first_name,
              Validators.required
            ],
            last_name:  [ this.newEmp.last_name,
              Validators.required
            ],
            copy_user:  [ this.newEmp.copy_user,
              Validators.required
            ],
            phone_ext:  [ this.newEmp.phone_ext,[
              Validators.minLength(4),
              Validators.maxLength(4),
              Validators.pattern("^[0-9]*$")]
            ],
            employee_id:  [ this.newEmp.employee_id,[
              Validators.minLength(5),
              Validators.pattern("^[0-9]*$")]
            ]
            
          });
    }
    ngOnInit(){
     this.isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
     this.userQuery = this.apollo.watchQuery({
       query:usersQuery
     })
     this.userQuery.valueChanges
      .subscribe(({data}:any) => {this.users = data.allUsers});
      this.route.queryParams
        .subscribe(params => {
            this.emp_id = params.id
        })
        if(this.emp_id){

           if(this.newEmp.employee_id){
            this.isUserReadOnly = true;
            }
              this.userFormQuery = this.apollo.watchQuery({
                query: getUserFormDetail,
                variables: {id: this.emp_id}
              })
             this.userFormQuery.valueChanges
             .subscribe(newEmp => {
                console.log(newEmp)
                 this.newEmp = newEmp.data.userForm.form
                 console.log(this.newEmp)
                 this.startDate = formatDate(this.newEmp.start_date, 'MM/dd/yyyy', 'en-US')
                 this.concatDisplayName();
                 this.unExists = this.users.some(e => e.user_name === this.newEmp.user_name)
                 console.log(this.newEmp.status)
                 if(this.newEmp.status === 'completed') {
                  this.isReadOnly = true;
                  this.isUserReadOnly = true;
                  this.isLocked = true;
                }
             })  
        } 
        else {
          this.newEmp = { create_mbx: true, sup_man_execs: false, home_drive: false }
        }
        
    }
    validateDisplayName(){
        if (!this.newEmp.display_name) {
            this.dnExists = false;
          }
          else {
              this.dnExists = this.users.some(e => e.display_name === this.newEmp.display_name)
  
          }
    }
    validateUserName() {
        
        if (!this.newEmp.user_name) {
          console.log(`user exists: ${this.unExists}`)
          this.unExists = false;
        }
        else {
          console.log(`user exists: ${this.unExists}`)
            this.unExists = this.users.some(e => e.user_name === this.newEmp.user_name)

        }
      }
      concatDisplayName() {

        if (this.newEmp.last_name && this.newEmp.first_name) {

        this.newEmp.display_name = `${this.newEmp.last_name}, ${this.newEmp.first_name}`

        this.newEmp.user_name = `${this.newEmp.last_name
          .substring(0, 6)
          .toUpperCase()}${this.newEmp.first_name
            .substring(0, 1)
            .toUpperCase()}`
            this.validateUserName()
            this.validateDisplayName()
         }
      }
    getDFUser(id: string){
        if (id){
          this.newEmp.employee_id = ''
          this.newEmp.first_name = ''
          this.newEmp.last_name = ''
          this.newEmp.description = ''
          this.newEmp.display_name = ''
            this.isUserReadOnly = false;
        this.dfUserQuery = this.apollo.watchQuery({
          query: dfUserQuery,
          variables: {id: id}
        })
        this.dfUserQuery.valueChanges
        .subscribe(res => {
          //console.log(res.data.dfUser)
            if(res.data){
                let dfEmp = res.data.dfUser
                console.log(dfEmp)
                this.newEmp.employee_id = id
                this.newEmp.first_name = dfEmp.FirstName
                this.newEmp.last_name = dfEmp.LastName
                this.newEmp.description = dfEmp.Title,
                this.newEmp.display_name = `${dfEmp.LastName}, ${dfEmp.FirstName}`
                this.isUserReadOnly = true;
            }
        },
        err => {
            this.invalidEmpIdModal = true;
            this.isUserReadOnly = false
        
        }
        )
    } else {
      this.isUserReadOnly = false;
    }
}
    createUserForm(){

                      this.newEmp.create_mbx = true, 
                      this.newEmp.sup_man_execs = false,
                      this.newEmp.home_drive = false,
                      this.newEmp.submitted_by = localStorage.getItem('user_name'),
                      this.newEmp.status = 'pending'
                      
        this.concatDisplayName()
        console.log(this.newEmp)
        this.apollo.mutate( {
          mutation: newUserForm,
          variables: {input: this.newEmp},
          update: (store, pendingResponse: any) => {
            const data: any = store.readQuery({query: pendingQuery});
            data.allUserForms.pending_count = data.allUserForms.pending_count + 1
            store.writeQuery({query: pendingQuery, data})
          }
        }
        
        )
        
        .subscribe( ({ data }: any) => {
          
            let emp = data.createUserForm.form
            this.emp_id = emp.id
            console.log(emp)
            console.log(this.emp_id)
        this.userService.sendMail(emp.submit_user.email, emp.id, emp.first_name, emp.last_name, emp.submit_user.user_name)
        .subscribe(email => email)
          //this.show('success', 'Form Saved', `Form for ${newEmp.data.display_name}, was successfully Saved. ID is ${this.emp_id}`)
          this.submitBtnState = ClrLoadingState.SUCCESS;
          this.successModal = true
        },
          err => {
            this.submitBtnState = ClrLoadingState.ERROR;
          })
      }

      createUser() {
        this.validateUserName();
        if (this.unExists){
          this.userExistsModal = true;
        }
        else {
        this.newEmp.created_by = localStorage.getItem('user_name'),
        this.newEmp.status = 'completed'
          delete this.newEmp['id']
          delete this.newEmp['create_user']
          delete this.newEmp['submit_user']
          console.log(this.newEmp)
        this.submitBtnState = ClrLoadingState.LOADING;
        console.log(this.newEmp)
        this.userService.createUser(this.newEmp)
          .subscribe(createdUser => {
            this.apollo.mutate({
              mutation: updateUserForm,
              variables: {id: this.emp_id, input: this.newEmp},
              update: (store, pendingResponse: any) => {
                const data: any = store.readQuery({query: pendingQuery});
                data.allUserForms.pending_count = data.allUserForms.pending_count - 1
                store.writeQuery({query: pendingQuery, data})
              }
            })
            .subscribe( ({data}: any) => {
              let emp = data.updateUserForm.form
              this.userService.sendMail(emp.submit_user.email, emp.id, emp.first_name, emp.last_name, emp.submit_user.user_name, emp.user_name, emp.status, this.newEmp.copy_user, this.newEmp.needs_onbase, this.newEmp.needs_stellar, this.newEmp.needs_dl)
              .subscribe(email => console.log(email))
                          })
            this.submitBtnState = ClrLoadingState.SUCCESS;
            this.createdModal = true
          },
            err => {
              this.submitBtnState = ClrLoadingState.ERROR;
            })
          }
      }

      successButton(){

          this.router.navigate(['/users/onboard-status'], {queryParams: {submitted_by: localStorage.getItem('user_name')}})
      }
      createdButton(){

        this.router.navigate(['/users'])
    }

    markTouched(){
      this.userForm.markAsTouched();
      this.userForm.markAsDirty();
      this.form.markAsTouched();
    }

    saveUserForm() {
      delete this.newEmp['id']
      delete this.newEmp['create_user']
      delete this.newEmp['submit_user']
      console.log(this.newEmp)
        this.apollo.mutate({
          mutation: updateUserForm,
          variables: {id: this.emp_id, input: this.newEmp}
        })
      .subscribe(({data}:any) => { data} )
    }

}
