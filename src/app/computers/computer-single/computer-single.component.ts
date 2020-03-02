import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Computer } from '../../shared/models/computer';
import {ClrDatagridStringFilterInterface} from "@clr/angular";
import { Application } from "../../shared/models/applications"
import { Apollo, QueryRef } from "apollo-angular"
import gql from 'graphql-tag'


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
    computerQuery: QueryRef<any>
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private apollo: Apollo

    ) { }

    ngOnInit() {
        // grab the id from the url
        let id = this.route.snapshot.params['computer_id'];

        // use the computerservice to getUser()
        this.computerQuery = this.apollo.watchQuery({
            query: gql`query computer($computer_id: ID!) {
                computer(computer_id: $computer_id)
                  {
                  computer_id
                  host_name
                  ad_last_logon
                  current_user
                  memory
                  os_name
                  chassis
                  os_service_pack
                  os_install_date
                  ip_address
                  ad_when_created
                  status
                  online_user
                  pdq_applications
                    {
                      name
                      version
                      install_date
                      publisher
                    }
                  pdq_displays
                    {
                      model
                    }
                  pdq_nic_ip
                    {
                      nic_id
                    }
                  user
                    {
                      user_name
                    }
                  }
                }

            `, 
            variables: {computer_id: id}
        })
        this.computerQuery.valueChanges
            .subscribe(({data}:any) => {
                this.selectedComputer = data.computer
                //console.log(dcomputer)
            });
     }

}