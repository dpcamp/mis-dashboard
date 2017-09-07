import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../../shared/services/computer.service';
import { Computer } from '../../shared/models/computer';

@Component({
    templateUrl: 'computer-list.component.html'
})
export class ComputerListComponent {
    computers: Computer[];
    selectedComputer: Computer;

    constructor(private service: ComputerService) { }

      ngOnInit() { 
    this.service.getComputers()
      .subscribe(computers => this.computers = computers);   
  }


}