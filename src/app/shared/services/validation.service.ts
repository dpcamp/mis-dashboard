import { Injectable } from '@angular/core';
import {throwError as observableThrowError} from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map, switchMap, catchError, mergeMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { UNValidation } from '../models/validation'
import { CreateUser } from '../models/user';

@Injectable()
export class ValidationService {

  constructor(
    private httpClient: HttpClient,
    private http: Http
  ) {
    // look at localStorage to check if the user is logged in
    // this.loggedIn = !!localStorage.getItem('auth_token');
  }


  /**
   * Log the user in
   */
  validateUserName(UN: CreateUser): Observable<UNValidation> {
    return this.httpClient.post(`${environment.validationUrl}/username`, UN)
        .pipe(
        map(res => res),
        // tap(users => users.map(this.toUser))
       catchError(this.handleError)
    )
 //         this.loggedIn = true;


  }

  /**
   * Handle any errors from the API
   */
  private handleError(err) {
    let errMessage: string;

    if (err instanceof Response) {
      const body   = err.json() || '';
      const error  = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
    } else {
      errMessage = err.message ? err.message : err.toString();
    }

    return observableThrowError(errMessage);
  }

}
