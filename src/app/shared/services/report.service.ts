import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Report } from '../models/report';
import { environment } from '../../../environments/environment';


@Injectable()
export class ReportService {
  private reportUrl: string = environment.reportUrl;

  constructor(private http: Http) {}

  

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
      .map(res => res.json().data)
      //.do(a => a.sr_count)
      //.map(this.toUser)
      .catch(this.handleError);
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
