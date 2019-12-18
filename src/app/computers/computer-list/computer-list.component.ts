import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../../shared/services/computer.service';
import { Computer } from '../../shared/models/computer';


@Component({
    templateUrl: 'computer-list.component.html'
})
export class ComputerListComponent {
    computers: Computer[];
    selectedComputer: Computer;
    yearFilter: number;
    yearTimeout: any;
    cols: any[];
    constructor(private service: ComputerService) { }

      ngOnInit() { 
    this.service.getComputers()
      .subscribe(computers => this.computers = computers);
      this.cols = [
        { field: 'computer_name', header: 'Computer Name' },
        { field: 'computer_type', header: 'Computer Type' },
        { field: 'ip_address', header: 'IP Address' },
        { field: 'installed_on', header: 'Date Installed' }
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