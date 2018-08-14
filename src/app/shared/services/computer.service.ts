
import {throwError as observableThrowError} from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map, switchMap, catchError, mergeMap, tap } from 'rxjs/operators';
import { Computer } from '../models/computer';
import { environment } from '../../../environments/environment';

@Injectable()
export class ComputerService {
    private computersUrl: string = environment.computersUrl;

    constructor(private http: Http) { }
    /**
     * Get all computers
     */
    getComputers(): Observable<Computer[]> {
        return this.http.get(`${this.computersUrl}`)
            .pipe(
                map(res => res.json().data),
                catchError(this.handleError)
            )
    }

    /**
    * Get a single computer
    */
    getComputer(id: string): Observable<Computer> {
        // attaching a token
        //let headers = new Headers();
        //headers.append('Content-Type', 'application/json');

        return this.http.get(`${this.computersUrl}/${id}`)
            .pipe(
                map(res => res.json()),
                catchError(this.handleError)
            )
    }
    private handleError(err) {
        let errMessage: string;

        if (err instanceof Response) {
            let body = err.json() || '';
            let error = body.error || JSON.stringify(body);
            errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
        } else {
            errMessage = err.message ? err.message : err.toString();
        }

        return observableThrowError(errMessage);
    }
}