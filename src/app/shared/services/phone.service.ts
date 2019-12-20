
import {throwError as observableThrowError} from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map, switchMap, catchError, mergeMap, tap } from 'rxjs/operators';

import { Subject } from 'rxjs/Subject';
import { Phone } from '../models/phone';
import { environment } from '../../../environments/environment';


@Injectable()
export class PhoneService {
  private phonesUrl: string = environment.phonesUrl;


  // observable source
  private phoneCreatedSource = new Subject<Phone>();
  private phoneUpdatedSource = new Subject<Phone>();
  private phoneDeletedSource = new Subject();

  // observable stream
  phoneUpdated$ = this.phoneUpdatedSource.asObservable();
  phoneCreated$ = this.phoneCreatedSource.asObservable();
  phoneDeleted$ = this.phoneDeletedSource.asObservable();

  constructor(private http: Http) {}

  getPhoneAssignment(): Observable<Phone[]> {
    return this.http.get(`${this.phonesUrl}`)
    .pipe(
    map(res => res.json().data[0].owners),
    catchError(this.handleError)
    )
  }
  /**
   * Get all phones
   */
  getPhones(): Observable<Phone[]> {
    return this.http.get(`${this.phonesUrl}`)
    .pipe(
      map(res => res.json().data),
      catchError(this.handleError)
    )
  }

/**
   * Get a single phone
   */
  getPhone(id: number): Observable<Phone> {
    // attaching a token
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.phonesUrl}/${id}`)
    .pipe(
      map(res => res.json()),
      // .map(this.toPhone)
      catchError(this.handleError)
    )
  }
  /**
   * Get a single phone
   */
  getPhoneByEXT(ext: number): Observable<Phone[]> {
    // attaching a token
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.phonesUrl}/getEXT/${ext}`)
      .pipe(
        map(res => res.json()),
        catchError(this.handleError)
  )
  }
  /**
   * Create the phone
   */
  createPhone(phone: Phone): Observable<Phone> {
    return this.http.post(this.phonesUrl, phone)
      .pipe(
        map(res => res.json()),
        tap(phone => this.phoneCreated(phone)),
        catchError(this.handleError)
  )
  }

  /**
   * Update the phone
   */
  updatePhone(phone: Phone): Observable<Phone> {
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.phonesUrl}/${phone.id}`, phone)
      .pipe(
        map(res => res.json()),
        tap(phone => this.http.post(`${this.phonesUrl}/${phone.id}/users/`, phone)),
        catchError(this.handleError)
  )
  }

    /**
   * Delete the user
   */
  deletePhone(id: string): Observable<any> {
    return this.http.delete(`${this.phonesUrl}/${id}`)
      .pipe(
        tap(res => this.phoneDeleted()),
        catchError(this.handleError)
      )
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

   phoneUpdateUser(id, un) {
     // console.log(`SAMAccountName is: ${un}`)
     return this.http.post(`${this.phonesUrl}/${id}/users/`, {UserSAMAccountName: `${un}`})
   }

  private handleError(err) {
    let errMessage: string;

    if (err instanceof Response) {
      let body   = err.json() || '';
      let error  = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
    } else {
      errMessage = err.message ? err.message : err.toString();
    }

    return observableThrowError(errMessage);
  }

}