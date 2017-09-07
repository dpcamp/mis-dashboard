import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Computer } from '../models/computer';


@Injectable()
export class ComputerService {
    private computersUrl: string = 'http://192.168.235.96:3000/api/computers';

    constructor(private http: Http) { }
    /**
     * Get all computers
     */
    getComputers(): Observable<Computer[]> {
        return this.http.get(`${this.computersUrl}`)
            .map(res => res.json().data)
            .catch(this.handleError);
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

        return Observable.throw(errMessage);
    }

}