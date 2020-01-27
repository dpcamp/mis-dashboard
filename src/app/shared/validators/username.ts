import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService} from '../services/validation.service'

@Injectable()
export class UsernameValidator {

  debouncer: any;

  constructor(public validationService: ValidationService){

  }

  checkUsername(control: FormControl): any {

    clearTimeout(this.debouncer);

    return new Promise(resolve => {

      this.debouncer = setTimeout(() => {

        this.validationService.validateUserName(control.value)
        .subscribe((res) => {
          console.log(res)
          if(res.user_exists === true){
            
            resolve({'usernameInUse': true});
          }
          else {
            
            resolve(null)
          }
        });

      }, 1000);      

    });
  }

}