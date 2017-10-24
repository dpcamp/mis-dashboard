import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportService } from '../../shared/services/report.service';
import { Report } from '../../shared/models/report';
import { Message } from 'primeng/primeng';

@Component({
    selector: 'sr-reports',
    templateUrl: 'sr-reports.component.html'
})
export class SrReportsComponent implements OnInit {

    data: any;

    private today = new Date();
    private dd = this.today.getDate();
    private mm = this.today.getMonth();
    private curMM
    private newMM
    private curDD
    private convDD
    private convMM
    private lastMM
    private lastConvMM

    srCount1 = [];
    dayNum1 = [];



    private lastMonth
    private lastThirty

    private yyyy = this.today.getFullYear();


    constructor(
        private reportService: ReportService,
        private route: ActivatedRoute,
        private router: Router

    ) { }

    ngOnInit() {

        this.curDD = this.dd.toString();
        this.convDD = this.curDD.padStart(2, "0"); //adds 0 to date under 10
        this.curMM = 1 + this.mm;
        this.newMM = this.curMM.toString()
        this.convMM = this.newMM.padStart(2, "0");
        this.lastMM = this.mm.toString();
        this.lastConvMM = this.lastMM.padStart(2, "0");
        let today = `${this.yyyy}-${this.convMM}-${this.convDD}`
        let tParts = today.split('-');
        let tSub30 = new Date(`${tParts[0]}-${(+tParts[1] - +1)}-${tParts[2]}`)
        let lastMonth = `${this.yyyy}-${this.lastConvMM}-${this.convDD}`
        console.log(`today is ${today}`)
        console.log(`last months date is: ${lastMonth}`)

        let dataSet1= [];
        let labels = [];
        this.reportService.getSR('Month', lastMonth, today)
            .subscribe(data => {
                dataSet1.push(data.map(a => a.sr_count))
                
                let monthName = data.map(item => {
                    return item.month_name
                })
                labels.push.apply(labels, monthName)
                console.log(labels) //["October", "September"]
            });

        console.log(labels) // I think its [["October", "September"]]
        console.log(dataSet1) // [[109,34]]

        this.data = {
            labels: labels, //undefined
            datasets: [
                {
                    label: 'First Dataset',
                    data: dataSet1, //undefined
                    fill: false,
                    borderColor: '#4bc0c0'
                }

            ]
        }
    }

}
