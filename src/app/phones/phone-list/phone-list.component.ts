import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Phone } from '../../shared/models/phone';
import { User } from '../../shared/models/user';
import { SelectedItem } from '../../shared/models/selected-item';
import {MessageService} from 'primeng/api';
import {Apollo} from 'apollo-angular'
import gql from 'graphql-tag'
import {Table} from 'primeng/table';
import { phonesQuery  } from '../../shared/queries/phones'
import { usersQuery  } from '../../shared/queries/users'
import { createPhone, deletePhone, updatePhone } from '../../shared/mutations/phones'



import { ClrWizard, ClrDatagridStringFilterInterface } from '@clr/angular';
import { style } from '@angular/animations';

class UserFilter implements ClrDatagridStringFilterInterface<Phone> {
  accepts(phone: Phone, search: string): boolean {
    return "" + phone.owners[0].display_name == search
      || phone.owners[0].display_name.toLowerCase().indexOf(search) >= 0;
  }
}

class PhoneFilter implements ClrDatagridStringFilterInterface<Phone> {
  accepts(phone: Phone, search: string): boolean {
    return "" + phone.full_number == search

  }
}


@Component({
  templateUrl: 'phone-list.component.html',
  styleUrls: ['phone-list.component.css']
})
export class PhoneListComponent implements OnInit {
  @ViewChild('dt') dt: Table;
  globalFilter: string
  loading: boolean;
  phones: Phone[];
  users: User[];
  assignment: Phone[];
  lineTypes: SelectedItem[];
  cols: any[];


  private userFilter = new UserFilter();
  phoneFilter = new PhoneFilter();

  totalRecords: number;
  //msgs: Message[] = [];

  selectedPhone: Phone;
  newPhone: Phone = {};

  successMessage: string = '';
  errorMessage: string = '';

  mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  @ViewChild('createlg') createLarge: ClrWizard;
  @ViewChild('updatelg') updateLarge: ClrWizard;

  createOpen: boolean = false;
  updateOpen: boolean = false;

  delModalOpen: boolean = false;
  private phoneSubscription: Subscription;
  private userSubscription: Subscription;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private apollo: Apollo,


  ) { }


  ngOnInit() {
    this.phoneSubscription = this.apollo.watchQuery<any>({
      query: phonesQuery,
    })
    .valueChanges
    .subscribe(({data}) => {
      this.phones = data.allPhones
    })

    this.userSubscription = this.apollo.watchQuery<any>({
      query: usersQuery,
    })
    .valueChanges
    .subscribe(({data}) => {
      this.users = data.allUsers
    })
    

      this.lineTypes = [];
      this.lineTypes.push({label: 'All Types', value: null});
      this.lineTypes.push({label: 'Patec Digital', value:'Patec Digital Phone Line'});
      this.lineTypes.push({label: 'Centrex Analog', value:'Centrex Analog'})
      this.cols = [
        { field: 'full_number', header: 'Telephone' },
        { field: 'extension', header: 'Extension' },
        { field: 'location', header: 'Location' },
        { field: 'owners',  subfield: 'display_name', header: 'Assigned To' },
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
      this.apollo.mutate({
        mutation: createPhone,
        variables: {
          input: this.newPhone
        }, 
        update: (store, allPhones: any) => {
          const data: any = store.readQuery({query: phonesQuery});
          console.log('update data', data)
          data.allPhones = [ ...data.allPhones, allPhones.data.createPhone ]
          store.writeQuery({query: phonesQuery, data})
        }
      }).subscribe(({data}) => {
        console.log('got data', data);
      },(error) => {
        console.log('ERROR', error)
      })
  }

  /**
   * Edit a phone
   */
  updatePhone() {
    
    this.apollo.mutate({
      mutation: updatePhone,
      variables: {
        id: this.selectedPhone.id,
        input: this.selectedPhone
      }, 
      update: (store, updatePhone: any) => {
        const data: any = store.readQuery({query: phonesQuery});
        const index = data.allPhones.findIndex((e) => e.id === updatePhone.data.updatePhone.id);
        data.allPhones[index] = updatePhone.data.updatePhone

        store.writeQuery({query: phonesQuery, data})
      }
    }).subscribe((data:any) => {
      this.selectedPhone = data.data.updatePhone;
      this.resetSearch();
    },(error) => {
      console.log('ERROR', error)
    })

  }
  /**
   * Delete a Phone
   */
  deletePhone() {
      this.apollo.mutate({
        mutation: deletePhone,
        variables: {
          id: this.selectedPhone.id
        },
        update: (store, updatePhone: any) => {
          const data: any = store.readQuery({query: phonesQuery});
          const index = data.allPhones.findIndex((e) => e.id === this.selectedPhone.id);
          data.allPhones.splice(index, 1)
          store.writeQuery({query: phonesQuery, data})
          this.resetSearch()
        }
      })
      .subscribe((data:any) => {
        this.deleteModal();
        this.selectedPhone = null;
        
      },(error) => {
        console.log('ERROR', error)
      })

  }

  /**
   * Shows the Growl message 
   */

  show(sev: string, sum: string, msg: string) {

    this.messageService.add({ severity: `${sev}`, summary: `${sum}`, detail: `${msg}` });
  }

  clear() {
    this.messageService.clear();
}

  /**
   * Refreshes table view when filtered after gql cache is updated. 
   */
resetSearch():void {

  this.dt.filterGlobal(this.globalFilter, 'contains')
}
  ngOnDestroy() {
    this.phoneSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}