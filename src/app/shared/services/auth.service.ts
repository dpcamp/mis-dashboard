import { Injectable } from '@angular/core';
import {throwError as observableThrowError} from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map, switchMap, catchError, mergeMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { LoggedUser } from '../models/logged-user'

@Injectable()
export class AuthService {
  //private authUrl: string = 'https://reqres.in/api';
  private loggedIn: boolean = false;
  
  constructor(
    private http: HttpClient
  ) {
    // look at localStorage to check if the user is logged in
    //this.loggedIn = !!localStorage.getItem('auth_token');
  }

  /**
   * Check if the user is logged in
  isLoggedIn() {
    return this.loggedIn;
  }

  /**
   * Log the user in
   */
  login(): Observable<any> {
    return this.http.get(`${environment.authUrl}auth/getuser`)
        .pipe(
        map(res => res),
      //.map(users => users.map(this.toUser))
       catchError(this.handleError)
    )
 //         this.loggedIn = true;
        

  }

  /**
   * Log the user out
   */
  logout() {
    //localStorage.removeItem('auth_token');
    this.loggedIn = false;
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

    return observableThrowError(errMessage);
  }

}
