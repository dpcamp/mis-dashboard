import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { User, CreateUser } from '../../shared/models/user';
import { UNValidation, DNValidation } from '../../shared/models/validation';
import { UserService } from '../../shared/services/user.service'
import { ValidationService } from '../../shared/services/validation.service'
import {MessageService} from 'primeng/api';
import { ClrLoadingState, ClrLoading } from '@clr/angular'
import {ToastModule} from 'primeng/toast';
import { concat } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import {UsernameValidator} from '../../shared/validators/username'
@Component({
   
    selector: 'user-onboard',
    templateUrl: 'user-onboard.component.html',
    styleUrls: ['user-onboard.component.scss']
})
export class UserOnboardComponent implements OnInit {
    isAdmin: boolean;
    unExists: boolean = false;
    dnExists: boolean = false;
    userExistsModal: boolean = false;
    successModal: boolean = false;
    createdModal: boolean = false;
    isUserReadOnly: boolean = false;
    isReadOnly: boolean = false;
    startDate: string;
    users: User[] = [];
    newEmp: CreateUser = {};
    emp_id: string;
    form: FormGroup;
    userForm: FormGroup;
    submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
    unValidation: UNValidation;
    templateForm = {
        name: {
            id: '',
            employee_id: '',
            first_name: '',
            last_name: '',
            display_name: '',
            job_title: '',
            building: '',
            start_date: '',
        },
        computer: {
            need_computer: '',
            pc_number: '',

        },
        account: {
            copy_user: '',
            needs_ax: '',
            needs_ice: '',
            needs_stellar: '',
            needs_onbase: '',
            needs_dl: '',
            needs_scan: '',
            needs_PDF: '',
            needs_autocad: '',
            needs_publisher: '',
            needs_visio: '',
            needs_shoretel: '',
            needs_sec: '',
            shared_mbx: '',
            description: '',


        },
        telephone: {
            needs_deskphone: '',
            needs_cell: '',
            phone_ext: '',

        },
    }
    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router: Router,
        public usernameValidator: UsernameValidator,
        private validationService: ValidationService,
    ){

        this.userForm = new FormGroup({
            'user_name': new FormControl(this.newEmp.user_name, [
              Validators.required,
              Validators.minLength(3)
            ]),
            'display_name': new FormControl(this.newEmp.display_name, [
              Validators.required
            ]),
            'first_name': new FormControl(this.newEmp.first_name, [
              Validators.required
            ]),
            'last_name': new FormControl(this.newEmp.last_name, [
              Validators.required
            ])
          });
        this.form = this.formBuilder.group({
            name: this.formBuilder.group({
                id: [],
                employee_id: [],
                first_name: [],
                last_name: [],
                display_name: [],
                job_title: [],
                building: [],
                start_date: [],
            }),
            computer: this.formBuilder.group({
                need_computer: [],
                pc_number: [],

            }),
            account: this.formBuilder.group({
                copy_user: [],
                needs_ax: [],
                needs_ice: [],
                needs_stellar: [],
                needs_onbase: [],
                needs_dl: [],
                needs_scan: [],
                needs_PDF: [],
                needs_autocad: [],
                needs_publisher: [],
                needs_visio: [],
                needs_shoretel: [],
                needs_sec: [],
                shared_mbx: [],
                description: [],


            }),
            telephone: this.formBuilder.group({
                needs_deskphone: [],
                needs_cell: [],
                phone_ext: [],

            }),
        })
    }
    show(sev: string, sum: string, msg: string) {

        this.messageService.add({ severity: `${sev}`, summary: `${sum}`, detail: `${msg}` })
    
      }
      clear() {
        this.messageService.clear();
    }
    ngOnInit(){
      this.isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
      
      this.userService.getUsers()
      .subscribe(users => {this.users = users});
        this.route.queryParams
        .subscribe(params => {
            this.emp_id = params.id
        })
       console.log(`employee_id: ${this.emp_id}`)
        if(this.emp_id){

            this.isReadOnly = true;
            this.isUserReadOnly = true;
            
             this.userService.getUserForm(this.emp_id)
             .subscribe(newEmp => {
               
                 this.newEmp = newEmp
                 this.startDate = formatDate(this.newEmp.start_date, 'MM/dd/yyyy', 'en-US')
                 this.concatDisplayName();
                 this.unExists = this.users.some(e => e.user_name === this.newEmp.user_name)
                 
             })
             
        }

          
          //this.unValidation = {user_name_exists: false}
          //this.dnValidation = {display_name_exists: false}

        
    }
    validateDisplayName(){
        if (this.newEmp.display_name === '') {
            this.dnExists = false;
          }
          if (this.newEmp.display_name) {
              this.dnExists = this.users.some(e => e.display_name === this.newEmp.display_name)
  
          }
    }
    validateUserName() {
        
        if (this.newEmp.user_name === '') {
          console.log(`user exists: ${this.unExists}`)
          this.unExists = false;
        }
        if (this.newEmp.user_name) {
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
            //this.validateDisplayName()
        }
      }
    getDFUser(id: string){
        console.log(id)
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
                    department: dfEmp[0].Department,
                    job_title: dfEmp[0].Title, 
                    display_name: `${dfEmp[0].LastName}, ${dfEmp[0].FirstName}`
    
                }
                this.isUserReadOnly = true;
            }
            else{
                console.log('DOESNT EXIST')
            }

            console.log(dfEmp)
            console.log(this.newEmp)
        })
    }
}
    createUserForm(){

                      this.newEmp.create_mbx = true, 
                      this.newEmp.sup_man_execs = false,
                      this.newEmp.home_drive = false,
                      this.newEmp.submitted_by = localStorage.getItem('user_name'),
                      this.newEmp.status = 'pending'


        this.userService.createUserForm(this.newEmp)
        .subscribe(newEmp => {
            this.emp_id = newEmp.data.id;
        this.userService.sendMail(newEmp.data.submit_user.email, newEmp.data.id)
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
        //console.log(this.newEmp)
        this.submitBtnState = ClrLoadingState.LOADING;
        this.userService.createUser(this.newEmp)
          .subscribe(createdUser => {
            //this.show('success', 'User Created', `${this.newEmp.display_name} was successfully created`)
            this.userService.updateUserForm(this.newEmp)
            .subscribe(res => res)
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
          this.router.navigate(['/users/onboard-status'], {queryParams: {id: localStorage.getItem('user_name')}})
      }
      createdButton(){
        //this.successModal = !this.successModal
        this.router.navigate(['/users'])
    }

}
