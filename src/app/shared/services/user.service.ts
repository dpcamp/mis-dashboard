
import {throwError as observableThrowError} from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap, catchError, mergeMap, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { User, CreateUser } from '../models/user';
import { environment } from '../../../environments/environment';


@Injectable()
export class UserService {
  private usersUrl: string = environment.usersUrl;
  private createUsersUrl: string = environment.createUsersUrl;

  // observable source
  private userCreatedSource = new Subject<CreateUser>();
  private userDeletedSource = new Subject();

  // observable stream
  userCreated$ = this.userCreatedSource.asObservable();
  userDeleted$ = this.userDeletedSource.asObservable();

  constructor(
    private http: Http,
    protected httpClient: HttpClient
  ) {}

  /**
   * Get all users
   */
  getUsers(): Observable<User[]> {
    return this.http.get(this.usersUrl)
      .pipe(
        map(res => res.json().data),
      // .map(users => users.map(this.toUser))
       catchError(this.handleError)
    )


  }

  /**
   * Get a single user
   */
  getUser(un: string): Observable<User> {
    // attaching a token
    // let headers = new Headers();
    // let token   = localStorage.getItem('auth_token');
    // headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.usersUrl}/${un}`)
      .pipe(
        map(res => res.json()),
        catchError(this.handleError)
      )
  }

    /**
   * Get a single user by Ext
   */
  getUserExt(id: number): Observable<User> {
    // attaching a token
    // let headers = new Headers();
    // let token   = localStorage.getItem('auth_token');
    // headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.usersUrl}/ext/${id}`)
      .pipe(
        map(res => res.json()),
       catchError(this.handleError)
      )
  }

  /**
   * Create the user
   */
  createUser(cUser: CreateUser): Observable<CreateUser> {
    return this.httpClient.post(this.createUsersUrl, cUser)
      .pipe(
        map(res => res),
        tap(res => this.userCreated(cUser)),
       catchError(this.handleError)
      )
  }

  /**
   * Update the user
   */
  updateUser(user: User): Observable<User> {
    return this.http.put(`${this.usersUrl}/${user.id}`, user)
      .pipe(
        map(res => res.json()),
        catchError(this.handleError)
      )
  }

  /**
   * Delete the user
   */
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.usersUrl}/${id}`)
    .pipe(
      tap(res => this.userDeleted()),
      catchError(this.handleError)
    )
  }

  /**
   * The user was created. add this info to our stream
   */
  userCreated(user: CreateUser) {
    this.userCreatedSource.next(user);
  }

  /**
 * The user was deleted. add this info to our stream
 */
  userDeleted() {
    this.userDeletedSource.next();
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
