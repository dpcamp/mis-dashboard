import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Apollo, QueryRef} from 'apollo-angular'
import {AXVoucher, VouchersQueryResponse} from '../shared/models/vouchers'
import {ClrDatagridSortOrder, ClrDatagrid} from "@clr/angular";
import {ClrDatagridStateInterface,ClrDatagridComparatorInterface} from "@clr/angular";
import gql from 'graphql-tag'

const VOUCHER_QUERY = gql`
query allAPVouchers($year:Int!, $noAssociation:Boolean!){
    allAPVouchers(year:$year, noAssociation:$noAssociation) {
    
      inputKey
      checkDate
      vendorCode
      invoiceNum
      onbase{
        
        input
        itemName
        batchNum
        username
        realName
        dateStored
      }
    }
  }
`
const currentYear = (new Date()).getFullYear();
const range = (start, stop, step) => 
    Array.from({length: (stop - start) / step +1}, (_, i) => 
    start + (i * step));
const apYears = range(currentYear, 2016, -1);


@Component({
    templateUrl: 'vouchers.component.html',
    styleUrls: ['vouchers.component.scss']
})

export class VouchersComponent implements OnInit{
    total: number;
    loading: boolean = true;
    noOnBase: boolean = false;

descSort: any
vouchers: [AXVoucher]
vouchersQueryResponse: QueryRef<VouchersQueryResponse>
year: number
APYears: any[] =[]

constructor(
    private apollo: Apollo,
    private route:ActivatedRoute,
    private router: Router
)
{}

ngOnInit(){
    
    for(let apyear of apYears) {this.APYears.push({year: apyear})}

    this.descSort = ClrDatagridSortOrder.DESC;
    this.route.queryParams
    .subscribe(params => {
        if (params.year){
            console.log('found params')
            this.getVouchers(parseInt(params.year), JSON.parse(params.noOnBase))
        }
        else {
            console.log('no params')
            this.router.navigate(['/vouchers'], { queryParams: {year: '2020', noOnBase: 'false'}})
        }
        
        
    }
        )
}

getVouchers(year:number, noOnBase:Boolean){
    this.loading = true
    this.year = year
    this.vouchersQueryResponse = this.apollo.watchQuery({
        query: VOUCHER_QUERY,
        variables: { year: year, noAssociation:noOnBase
        }
    })
    this.vouchersQueryResponse.valueChanges
    .subscribe(({data}:any) => {
        
        this.vouchers = data.allAPVouchers
        
        this.loading = false
    })
    
    
    
}
obParams(){
    this.noOnBase = !this.noOnBase
    this.loading = true;
    this.router.navigate(
        [], 
        {
          relativeTo: this.route,
          queryParams: { noOnBase: this.noOnBase },
          queryParamsHandling: 'merge'
        });
}

    
}
