import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhoneService } from '../../shared/services/phone.service';
import { Phone } from '../../shared/models/phone';

@Component({
  templateUrl: 'phone-list.component.html'
})
export class PhoneListComponent implements OnInit {
  phones: Phone[];
  pageValue: number = 1;
  @Input()
  get page() {
    return this.pageValue;
  }
  @Output() pageChange = new EventEmitter();
  set page(value) {
    this.pageValue = value;
    this.pageChange.emit(this.pageValue);
  }
  decrement() {
    this.page--;
    this.updatePage();
  }
  increment() {
    this.page++
    this.updatePage();
  }



  constructor(
    private service: PhoneService,
    private route: ActivatedRoute
    ) { }

  
  ngOnInit() { 
    //let per_page = 30;
    
    this.service.getPhones(this.pageValue)
      .subscribe(phones => this.phones = phones);  

 
  }

  updatePage() {
      this.service.getPhones(this.pageValue)
      .subscribe(phones => this.phones = phones); 
  }



}