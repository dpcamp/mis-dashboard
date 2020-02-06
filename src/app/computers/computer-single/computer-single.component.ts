import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Computer } from '../../shared/models/computer';
import { ComputerService } from '../../shared/services/computer.service';
import {ClrDatagridStringFilterInterface} from "@clr/angular";
import { Application } from "../../shared/models/applications"

export class AppFilter implements ClrDatagridStringFilterInterface<Application> {
    accepts(app: Application, search: string):boolean {
        return "" + app.name == search
        || app.name.toLowerCase().indexOf(search) >= 0;
    };

}
@Component({
    moduleId: module.id,
    selector: 'computer-single',
    templateUrl: 'computer-single.component.html',
    styleUrls: ['computer-single.component.scss']
})



export class ComputerSingleComponent implements OnInit {
    selectedComputer: Computer;
    public appFilter = new AppFilter()
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ComputerService,
        

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