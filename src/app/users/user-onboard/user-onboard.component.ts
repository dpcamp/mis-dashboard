import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  FormControl } from '@angular/forms';
import { User, CreateUser } from '../../shared/models/user';
import { UNValidation,  } from '../../shared/models/validation';
import { UserService } from '../../shared/services/user.service'
import { ValidationService } from '../../shared/services/validation.service'
import {MessageService} from 'primeng/api';
import { ClrLoadingState, ClrForm,  } from '@clr/angular'

import { ActivatedRoute, Router } from '@angular/router';
import {  formatDate } from '@angular/common';
import {UsernameValidator} from '../../shared/validators/username'
@Component({
   
    selector: 'user-onboard',
    templateUrl: 'user-onboard.component.html',
    styleUrls: ['user-onboard.component.scss']
})
export class UserOnboardComponent implements OnInit {
  @ViewChild(ClrForm, {static: false}) form: ClrForm;
    isAdmin: boolean;
    unExists: boolean = false;
    dnExists: boolean = false;
    userExistsModal: boolean = false;
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
    constructor(

        private userService: UserService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router: Router,
        public usernameValidator: UsernameValidator,
        private fb: FormBuilder

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
    show(sev: string, sum: string, msg: string) {

        this.messageService.add({ severity: `${sev}`, summary: `${sum}`, detail: `${msg}` })
    
      }
      clear() {
        this.messageService.clear();
    }
    ngOnInit(){
      
      console.log(this.userForm.valid)
      this.isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
      
      this.userService.getUsers()
      .subscribe(users => {this.users = users});
        this.route.queryParams
        .subscribe(params => {
            this.emp_id = params.id
        })
      //  console.log(`employee_id: ${this.emp_id}`)

        if(this.emp_id){

           if(this.newEmp.employee_id){
            this.isUserReadOnly = true;
            }
             this.userService.getUserForm(this.emp_id)
             .subscribe(newEmp => {
               
                 this.newEmp = newEmp
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

          
          //this.unValidation = {user_name_exists: false}
          //this.dnValidation = {display_name_exists: false}

        
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
            this.newEmp = {}
            this.isUserReadOnly = false;
        this.userService.getDayForceUser(id)
        .subscribe(dfEmp => {
            if(dfEmp[0]){
              this.newEmp = {
                    employee_id: id,
                    first_name: dfEmp[0].FirstName,
                    last_name: dfEmp[0].LastName,
                    job_title: dfEmp[0].Title, 
                    display_name: `${dfEmp[0].LastName}, ${dfEmp[0].FirstName}`
    
                }
                this.isUserReadOnly = true;
            }
            else{
                console.log('DOESNT EXIST')
                this.isUserReadOnly = false
            }


            console.log(dfEmp)
            console.log(this.newEmp)
        })
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

        this.userService.createUserForm(this.newEmp)
        .subscribe(newEmp => {
            this.emp_id = newEmp.data.id;
            let emp = newEmp.data
            console.log(emp)
        this.userService.sendMail(emp.submit_user.email, emp.id, emp.first_name, emp.last_name, emp.submit_user.user_name)
        .subscribe(email => email)
          //this.show('success', 'Form Saved', `Form for ${newEmp.data.display_name}, was successfully Saved. ID is ${this.emp_id}`)
          this.submitBtnState = ClrLoadingState.SUCCESS;
          this.successModal = true
          
          
          
        },
          err => {
            this.show('error', 'Error', `${err}`)
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

        this.submitBtnState = ClrLoadingState.LOADING;
        this.userService.createUser(this.newEmp)
          .subscribe(createdUser => {
          
            this.userService.updateUserForm(this.newEmp)
            .subscribe(res => {
              let emp = res.data
              this.userService.sendMail(emp.submit_user.email, emp.id, emp.first_name, emp.last_name, emp.submit_user.user_name, emp.user_name, emp.status, this.newEmp.copy_user, this.newEmp.needs_onbase, this.newEmp.needs_stellar, this.newEmp.needs_dl).subscribe(email => console.log(email))
                          })
            
            
            this.submitBtnState = ClrLoadingState.SUCCESS;
            this.createdModal = true
          },
            err => {
              this.show('error', 'Error', `${err}`)
              this.submitBtnState = ClrLoadingState.ERROR;
            })
          }
      }

      successButton(){
          //this.successModal = !this.successModal
          this.router.navigate(['/users/onboard-status'], {queryParams: {submitted_by: localStorage.getItem('user_name')}})
      }
      createdButton(){
        //this.successModal = !this.successModal
        this.router.navigate(['/users'])
    }

    markTouched(){
      console.log(this.userForm)
      this.userForm.markAsTouched();
      this.userForm.markAsDirty();
      this.form.markAsTouched();
    }

}
