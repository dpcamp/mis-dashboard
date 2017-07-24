import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Phone } from '../models/phone';

@Injectable()
export class PhoneService {
  private phonesUrl: string = 'http://192.168.235.96:3000/api/phones';

  // observable source
  private phoneCreatedSource = new Subject<Phone>();
  private phoneDeletedSource = new Subject();

  // observable stream
  phoneCreated$ = this.phoneCreatedSource.asObservable();
  phoneDeleted$ = this.phoneDeletedSource.asObservable();
  
  constructor(private http: Http) {}

  /**
   * Get all phones
   */
  getPhones(): Observable<Phone[]> {
    return this.http.get(`${this.phonesUrl}`)
      .map(res => res.json().data)
      //.map(phones => phones.map(this.toPhone))
      .catch(this.handleError);
  }

/**
   * Get a single phone
   */
  getPhone(id: number): Observable<Phone> {
    // attaching a token
    //let headers = new Headers();
    //headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.phonesUrl}/${id}`)
      .map(res => res.json())
      //.map(this.toPhone)
      .catch(this.handleError);
  }
  /**
   * Create the phone
   */
  createPhone(phone: Phone): Observable<Phone> {
    return this.http.post(this.phonesUrl, phone)
      .map(res => res.json())
      .do(phone => this.phoneCreated(phone))
      .catch(this.handleError);
  }

  /**
   * Update the phone
   */
  updatePhone(phone: Phone): Observable<Phone> {
    //let headers = new Headers();
    //headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.phonesUrl}/${phone.id}`, phone)
      .map(res => res.json())
      .map(this.toPhone)
      .catch(this.handleError);
  } 

    /**
   * Delete the user
   */
  deletePhone(id: string): Observable<any> {
    return this.http.delete(`${this.phonesUrl}/${id}`)
      .do(res => this.phoneDeleted())
      .catch(this.handleError);
  }

  /**
   * Convert user info from the API to our standard/format
   */
  
  private toPhone(phone): Phone {
    return {
      id : phone.id,
      full_number : phone.full_number,
      telephone : phone.telephone,
      division_id : phone.division_id,
      department : phone.department,
      position : phone.position,
      username : phone.username,
      location : phone.location,
      function_info : phone.function_info,
      notes : phone.notes,
      account_number : phone.account_number,
      date_installed : phone.date_installed,
      monthly_cost : phone.monthly_cost,
      investigate : phone.investigate,
      model : phone.model,
      line_type : phone.line_type,
      long_distance : phone.long_distance,
      need_voicemail : phone.need_voicemail,
      disconnect_now : phone.disconnect_now,
      disconnect_later : phone.disconnect_later,
      phone_number : phone.phone_number,
      ld_changed : phone.ld_changed,
      new_phone : phone.new_phone,
      switch_comments : phone.switch_comment,
      new_location : phone.new_location,
      drop_num : phone.drop_num,
      port_num : phone.port_num,
      extension : phone.extension,
      vm_id : phone.vm_id,
      binding_post : phone.binding_post,
      provider : phone.provider,
      pin : phone.pin,
      date_created : phone.date_created,

      message : phone.message
      //owner: `${phone.first_name} ${phone.last_name}`
    };
  }

  /**
   * The phone was created. add this info to our stream
   */
  phoneCreated(user: Phone) {
    this.phoneCreatedSource.next(user);
  }

  /**
 * The phone was deleted. add this info to our stream
 */
  phoneDeleted() {
    this.phoneDeletedSource.next();
  }

  /**
   * Handle any errors from the API
   */

  private handleError(err) {
    let errMessage: string;

    if (err instanceof Response) {
      let body   = err.json() || '';
      let error  = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
    } else {
      errMessage = err.message ? err.message : err.toString();
    }

    return Observable.throw(errMessage);
  }

}