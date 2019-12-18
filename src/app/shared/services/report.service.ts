
import {throwError as observableThrowError} from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map, switchMap, catchError, mergeMap, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Report } from '../models/report';
import { environment } from '../../../environments/environment';


@Injectable()
export class ReportService {
  private reportUrl: string = environment.reportUrl;

  private reportSource1 = new Subject<Report[]>();
  dataSource1$ = this.reportSource1.asObservable();

  constructor(private http: Http) {}

  // observable source


  /**
   * Get all SRs
   */
  getSR(groupBy: string, beginDate:string, endDate:string): Observable<Report[]> {
    // attaching a token
    //let headers = new Headers();
    //let token   = localStorage.getItem('auth_token');
    //headers.append('Content-Type', 'application/json');
    //headers.append('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.reportUrl}/SR?group_by="${groupBy}"&begin_date="${beginDate}"&end_date="${endDate}"`)
      .pipe(
        map(res => res.json().data),
        tap(user => this.reportCreated()),
        catchError(this.handleError)
      )
  }
  reportCreated() {
    this.reportSource1.next();
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
