
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
  private formUrl: string = environment.formsUrl;
  private mailUrl: string = environment.mailUrl;

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
    return this.httpClient.post<CreateUser>(this.createUsersUrl, cUser)
      .pipe(
        map((res : any) => res),
        tap(res => this.userCreated(cUser)),
       catchError(this.handleError)
      )
  }
      /**
   * Gets all user onboard status
   */
  getUserForms(queryParams?: string): Observable<any> {
    if(queryParams){
      return this.httpClient.get(`${this.formUrl}?${queryParams}`)
      .pipe(
        map(res => res),
       catchError(this.handleError)
      )
    } else {
      return this.httpClient.get(this.formUrl)
      .pipe(
        map(res => res),
       catchError(this.handleError)
      )
    }

  }
    /**
   * Gets user onboard status filtered by submitted_by
   */
  getUserFormSubmittedBy(user_name: string): Observable<any> {
    return this.httpClient.get(`${this.formUrl}?submitted_by=${user_name}`)
      .pipe(
        map(res => res),
       catchError(this.handleError)
      )
  }
    /**
   * Create the user
   */
  createUserForm(cUser: CreateUser): Observable<any> {
    return this.httpClient.post(this.formUrl, cUser)
      .pipe(
        map(res => res),
        tap(res => this.userCreated(cUser)),
       catchError(this.handleError)
      )
  }
      /**
   * sends mail data to server. Takes recipient email address, and new employees guid
   */
  sendMail(email: string, user_id: string): Observable<any> {
    return this.httpClient.post(this.mailUrl, {email: email, id:user_id})
      .pipe(
        map(res => res),
       catchError(this.handleError)
      )
  }
    /**
   * Get a single user form
   */
  getUserForm(id: string): Observable<any> {


    return this.http.get(`${this.formUrl}/${id}`)
      .pipe(
        map(res => res.json()),
        catchError(this.handleError)
      )
  }
      /**
   * Get Dayforce user data. Takes Employee ID
   */
  getDayForceUser(id: string): Observable<any> {


    return this.http.get(`${this.usersUrl}/emp_id/${id}`)
      .pipe(
        map(res => res.json().data),
        catchError(this.handleError)
      )
  }
    /**
   * Update the user form
   */
  updateUserForm(form: CreateUser): Observable<any> {
    return this.http.put(`${this.formUrl}/${form.id}`, form)
      .pipe(
        map(res => res.json()),
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
