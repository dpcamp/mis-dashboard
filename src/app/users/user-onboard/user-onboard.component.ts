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
import { ActivatedRoute } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';

@Component({
   
    selector: 'user-onboard',
    templateUrl: 'user-onboard.component.html',
    styleUrls: ['user-onboard.component.scss']
})
export class UserOnboardComponent implements OnInit {
    isUserReadOnly: boolean = false;
    isReadOnly: boolean = false;
    startDate: string;
    users: User[];
    newEmp: CreateUser = {};
    emp_id: string;
    form: FormGroup;
    submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT
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
    ){
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
        this.route.queryParams
        .subscribe(params => {
            this.emp_id = params.id
        })
       console.log(`employee_id: ${this.emp_id}`)
        if(this.emp_id){

            this.isReadOnly = true;
            this.isUserReadOnly = true;
            (console.log('EMPLOYEE ID IS NOT NULL'))
             this.userService.getUserForm(this.emp_id)
             .subscribe(newEmp => {
                 this.newEmp = newEmp
                 this.startDate = formatDate(this.newEmp.start_date, 'MM/dd/yyyy', 'en-US')
                 
             })
        }

          
          //this.unValidation = {user_name_exists: false}
          //this.dnValidation = {display_name_exists: false}
          this.userService.getUsers()
            .subscribe(users => {this.users = users});
        
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

        console.log(this.newEmp)
        this.userService.createUserForm(this.newEmp)
        .subscribe(newEmp => {
        this.emp_id = newEmp.id
        this.userService.sendMail('derek.campanile@vmsinc.org', newEmp.id)
        .subscribe(email => email)
          this.show('success', 'Form Saved', `Form for ${newEmp.display_name}, was successfully Saved. ID is ${this.emp_id}`)
          this.submitBtnState = ClrLoadingState.SUCCESS;
          
          
        },
          err => {
            this.show('error', 'Error', `${err}`)
            this.submitBtnState = ClrLoadingState.ERROR;
          })
      }

}
