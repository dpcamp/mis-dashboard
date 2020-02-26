import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../../shared/services/computer.service';
import { Computer } from '../../shared/models/computer';
import {DatePipe} from '@angular/common'
import {Apollo} from 'apollo-angular'
import gql from 'graphql-tag'


@Component({
    templateUrl: 'computer-list.component.html'
})
export class ComputerListComponent {
    computers: Computer[];
    selectedComputer: Computer;
    yearFilter: number;
    yearTimeout: any;
    cols: any[];
    constructor(
      private service: ComputerService,
      private datePipe: DatePipe, 
      private apollo: Apollo
      ) { }

      ngOnInit() { 
    // this.service.getComputers()
    //   .subscribe(computers => {this.computers = computers; console.log(this.selectedComputer)});
    this.apollo.query({
      query: gql`
      query {
        allComputers {
          computer_id
          chassis
          os_install_date
          ad_when_created
          host_name
          ad_last_logon
          memory
          ip_address
          os_name
          os_service_pack
          pdq_displays {
            model
          }
          user {
            display_name
          }
        }
      }
      `,
    })
    .subscribe((res:any) => {
      this.computers = res.data.allComputers
    })
      this.cols = [
        { field: 'host_name', header: 'Computer Name' },
        { field: 'chassis', header: 'Computer Type' },
        { field: 'ip_address', header: 'IP Address' },
        { field: 'os_install_date', header: 'OS Install Date', type:this.datePipe},
        { field: 'ad_when_created', header: 'AD Created Date', type:this.datePipe }
    ];   
  }
  onYearChange(event, dt, col) {
    if(this.yearTimeout) {
        clearTimeout(this.yearTimeout);
    }
    
    this.yearTimeout = setTimeout(() => {
        dt.filter(event.value, col.field, col.filterMatchMode);
    }, 250);
}

}