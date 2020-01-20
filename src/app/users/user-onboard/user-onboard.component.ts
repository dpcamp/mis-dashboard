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

@Component({
   
    selector: 'user-onboard',
    templateUrl: 'user-onboard.component.html',
    styleUrls: ['user-onboard.component.scss']
})
export class UserOnboardComponent implements OnInit {
    newEmp: CreateUser = {};
    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder
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

    ngOnInit(){
        
    }

}
