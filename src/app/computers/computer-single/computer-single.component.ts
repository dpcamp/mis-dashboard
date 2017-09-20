import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Computer } from '../../shared/models/computer';
import { ComputerService } from '../../shared/services/computer.service';

@Component({
    moduleId: module.id,
    selector: 'computer-single',
    templateUrl: 'computer-single.component.html',
    styleUrls: ['computer-single.component.scss']
})
export class ComputerSingleComponent implements OnInit {
    selectedComputer: Computer; 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ComputerService
    ) { }

    ngOnInit() {
        // grab the id from the url
        let id = this.route.snapshot.params['computer_id'];

        // use the computerservice to getUser()
        this.service.getComputer(id)
            .subscribe(computer => {
                this.selectedComputer = computer
                console.log(computer)
            });
     }

}