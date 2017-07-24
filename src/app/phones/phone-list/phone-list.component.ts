import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PhoneService } from '../../shared/services/phone.service';
import { Phone } from '../../shared/models/phone';
import { Message } from 'primeng/primeng';

import { Wizard } from 'clarity-angular';

@Component({
  templateUrl: 'phone-list.component.html'
})
export class PhoneListComponent implements OnInit {
  loading: boolean;
  phones: Phone[];
 
  totalRecords: number;
  msgs: Message[] = [];
  
  selectedPhone: Phone;
  newPhone: Phone = {};

  successMessage: string = '';
  errorMessage: string = '';

  @ViewChild('createlg') createLarge: Wizard;
  @ViewChild('updatelg') updateLarge: Wizard;

  createOpen: boolean = false;
  updateOpen: boolean = false; 

  delModalOpen: boolean = false;

  constructor(
    private service: PhoneService,
    private route: ActivatedRoute,
    private router: Router
    ) { }
  
  ngOnInit() { 
      this.service.getPhones()
      .subscribe(phones => this.phones = phones);
  }

  createPhoneWizard() {
    this.createOpen = !this.createOpen;
    console.log(`_ open is: ${this.createOpen}`)
  }

  updatePhoneWizard() {
  this.updateOpen = !this.updateOpen;
  console.log(`_ open is: ${this.updateOpen}`)
}
  deleteModal() {
  this.delModalOpen = !this.delModalOpen;
}
 /**
   * Create a phone
   */
  createPhone() {
    //this.successMessage = '';
    //this.errorMessage   = '';

    this.service.createPhone(this.newPhone)
      .subscribe(newPhone => {
        //this.successMessage = 'Phone was created!';
        console.log('phone was created');
        this.show('success','Phone Created',`Phone: ${this.newPhone.full_number} was successfully created`)
        this.refreshPhoneList();

        // navigate back to the phones page
        //this.router.navigate(['/phones']);
      })
  }

  /**
   * Edit a phone
   */
    updatePhone() {
    //this.successMessage = '';
    //this.errorMessage = '';

    this.service.updatePhone(this.selectedPhone)
      .subscribe(
      selectedPhone => {
        //this.successMessage = selectedPhone.message;
        console.log('phone was updated');
      },
      err => {
        //this.errorMessage = err;
        console.error(err);
      }
      );
  }
    /**
     * Delete a Phone
     */
        deletePhone() {
        this.service.deletePhone(this.selectedPhone.id)
        .subscribe(data => {
            this.deleteModal();
            this.refreshPhoneList();
            this.selectedPhone = null;
        });

    }
    
    /**
     * Get Phones
     */
    refreshPhoneList(){
        this.service.getPhones()
      .subscribe(res => this.phones = res);

    }

    /**
     * Shows the Growl message 
     */

     show(sev: string, sum: string, msg: string ){
       
       this.msgs =[];
       this.msgs.push({severity:`${sev}`, summary:`${sum}`, detail:`${msg}`});
     }
}