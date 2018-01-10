import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportService } from '../../shared/services/report.service';
import { Report } from '../../shared/models/report';
import { Message, UIChart  } from 'primeng/primeng';
import * as _ from 'lodash';

@Component({
    selector: 'sr-reports',
    templateUrl: 'sr-reports.component.html'
})

export class SrReportsComponent implements OnInit {
    @ViewChild('chart') chart: UIChart
    @ViewChild('chart2') chart2: UIChart
    data: any;
    data2: any;
    private today = new Date();
    private dd = this.today.getDate();
    private mm = this.today.getMonth();
    private curMM
    private newMM
    private curDD
    private convDD
    private convMM
    private lastMM
    private last2MM
    private lastConvMM
    private last2ConvMM

    srCount1 = [];
    dayNum1 = [];



    private lastMonth
    private lastThirty

    private yyyy = this.today.getFullYear();
    private lastYear;


    constructor(
        private reportService: ReportService,
        private route: ActivatedRoute,
        private router: Router

    ) {     }

    ngOnInit() {

        this.curDD = this.dd.toString();
        this.convDD = this.curDD.padStart(2, "0"); //adds 0 to date under 10
        this.curMM = 1 + this.mm;
        this.newMM = this.curMM.toString()
        this.convMM = this.newMM.padStart(2, "0");
        this.lastMM = this.mm.toString();  
        this.last2MM = this.mm - 1; 
        this.lastConvMM = this.lastMM.padStart(2, "0");
        this.last2ConvMM = this.last2MM.toString().padStart(2, "0");
        this.lastYear = (this.yyyy - 1).toString()
        let today = `${this.yyyy}-${this.convMM}-${this.convDD}`
        let tParts = today.split('-');
        let tSub30 = new Date(`${tParts[0]}-${(+tParts[1] - +1)}-${tParts[2]}`)

        let lastMonth = `${this.yyyy}-${this.lastConvMM}-${this.convDD}`
        let last2Month = `${this.yyyy}-${this.last2ConvMM}-${this.convDD}`
        let lastYear = `${this.lastYear}-${this.convMM}-${this.convDD}`

        let test = []

        this.reportService.getSR('Day', lastMonth, today)
        .subscribe(res => {         
            this.data.datasets[0].data = res.map(a =>  a.sr_count);
            this.data.labels = res.map(a =>  a.day_num);
        });
        this.reportService.getSR('Day', last2Month, lastMonth)
        .subscribe(res => {
            this.data.datasets[1].data = res.map(a =>  a.sr_count);
            this.chart.refresh();
        });
        this.reportService.getSR('Month', lastYear, today)
        .subscribe(res => {         
            this.data2.datasets[0].data = res.map(a =>  a.sr_count);
            this.data2.labels = res.map(a =>  a.month_name);
            this.chart2.refresh();
        });

        this.data = {
            labels: [],
            datasets: [
                {
                    label: 'This Month',
                    data: [],
                    fill: false,
                    borderColor: '#0094D3'
                },
                {
                    label: 'Last Month',
                    data: [],
                    fill: false,
                    borderColor: '#A6D8E7'
                }
            ]
        }
        this.data2 = {
            labels: [],
            datasets: [
                {
                    label: 'Last 12 Months',
                    data: [],
                    fill: false,
                    borderColor: '#0094D3'
                }
            ]
        }


    }
}
