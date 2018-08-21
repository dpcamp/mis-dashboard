import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PhoneService } from '../../shared/services/phone.service';
import { UserService } from '../../shared/services/user.service';
import { Phone } from '../../shared/models/phone';
import { User } from '../../shared/models/user';
import { SelectedItem } from '../../shared/models/selected-item';
import { Message } from 'primeng/primeng';



import { Wizard, StringFilter } from '@clr/angular';

class UserFilter implements StringFilter<Phone> {
  accepts(phone: Phone, search: string): boolean {
    return "" + phone.owners[0].display_name == search
      || phone.owners[0].display_name.toLowerCase().indexOf(search) >= 0;
  }
}

class PhoneFilter implements StringFilter<Phone> {
  accepts(phone: Phone, search: string): boolean {
    return "" + phone.full_number == search

  }
}

@Component({
  templateUrl: 'phone-list.component.html'
})
export class PhoneListComponent implements OnInit {
  loading: boolean;
  phones: Phone[];
  users: User[];
  assignment: Phone[];
  lineTypes: SelectedItem[];
  cols: any[];

  private userFilter = new UserFilter();
  phoneFilter = new PhoneFilter();

  totalRecords: number;
  msgs: Message[] = [];

  selectedPhone: Phone;
  newPhone: Phone = {};

  successMessage: string = '';
  errorMessage: string = '';

  mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  @ViewChild('createlg') createLarge: Wizard;
  @ViewChild('updatelg') updateLarge: Wizard;

  createOpen: boolean = false;
  updateOpen: boolean = false;

  delModalOpen: boolean = false;


  constructor(
    private phoneService: PhoneService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,




  ) { }


  ngOnInit() {
    this.phoneService.getPhones()
      .subscribe(phones => {
        this.phones = phones
        console.log(phones)
      });
    this.userService.getUsers()
      .subscribe(users => this.users = users);
    this.phoneService.getPhoneAssignment()
      .subscribe(assignment => {
        //let assign = this.assignment.toString();
        this.assignment = assignment
        //console.log(assignment)
      });
      this.lineTypes = [];
      this.lineTypes.push({label: 'All Types', value: null});
      this.lineTypes.push({label: 'Patec Digital', value:'Patec Digital Phone Line'});
      this.lineTypes.push({label: 'Centrex Analog', value:'Centrex Analog'})
      this.cols = [
        { field: 'full_number', header: 'Telephone' },
        { field: 'extension', header: 'Extension' },
        { field: 'location', header: 'Location' },
        //{ field: 'owners',  subfield: '0', header: 'Assigned To' },
        { field: 'function', header: 'Function' },
        { field: 'line_type', header: 'LineType' }
    ];   


  }

  createPhoneWizard() {
    this.createOpen = !this.createOpen;
    //console.log(`_ open is: ${this.createOpen}`)
  }

  updatePhoneWizard() {
    this.updateOpen = !this.updateOpen;
    //console.log(`_ open is: ${this.updateOpen}`)
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

    this.phoneService.createPhone(this.newPhone)
      .subscribe(newPhone => {
        //this.successMessage = 'Phone was created!';
        //console.log('phone was created');
        this.show('success', 'Phone Created', `Phone: ${this.newPhone.full_number} was successfully created`)
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
    if (this.selectedPhone.owners[0]) {
      this.phoneService.phoneUpdateUser(this.selectedPhone.id, this.selectedPhone.owners[0].user_name)
        .subscribe(
        selectedPhone => {
          //this.successMessage = selectedPhone.message;
          this.show('success', 'Phone Record Updated', `phone ID: ${this.selectedPhone.id} phone was assigned to ${this.selectedPhone.owners[0].user_name}`);
          this.refreshPhoneList();
        },
        err => {
          //this.errorMessage = err;
          console.error(`Error: ${err}`);
        }
        );
    }
    this.phoneService.updatePhone(this.selectedPhone)
      .subscribe(
      selectedPhone => {
        //this.successMessage = selectedPhone.message;
        this.show('success', 'Phone Record Updated', `Phone Record Updated`);
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
    this.phoneService.deletePhone(this.selectedPhone.id)
      .subscribe(data => {
        this.deleteModal();
        this.refreshPhoneList();
        this.selectedPhone = null;
      });

  }

  /**
   * Get Phones
   */
  refreshPhoneList() {
    this.phoneService.getPhones()
      .subscribe(res => this.phones = res);

  }

  /**
   * Shows the Growl message 
   */

  show(sev: string, sum: string, msg: string) {

    this.msgs = [];
    this.msgs.push({ severity: `${sev}`, summary: `${sum}`, detail: `${msg}` });
  }

  /**
   * Decodes User Array
   */
  decodedUser() {


  }

}