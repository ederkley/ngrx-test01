import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Global } from '../global';
import { Person, Position, Assignment } from '../_models/person';

@Injectable()
export class PersonService {
  private peopleUrl = Global.BASE_API_URL + 'people/';
  private positionsUrl = Global.BASE_API_URL + 'positions/';
  private assignmentsUrl = Global.BASE_API_URL + 'assignments/';

  constructor(private http: Http) { }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || { };
  }

  getPeople(): Observable<Person[]> {
    return this.http.get(this.peopleUrl, {
                  withCredentials: true
                })
               .map(this.extractData)
               .catch(this.handleError);
  };

  getPositions(): Observable<Position[]> {
    return this.http.get(this.positionsUrl, {
                  withCredentials: true
                })
               .map(this.extractData)
               .catch(this.handleError);
  };

  getAssignments(): Observable<Assignment[]> {
    return this.http.get(this.assignmentsUrl, {
                  withCredentials: true
                })
               .map(this.extractData)
               .catch(this.handleError);
  };

  getAssignment(id): Observable<Assignment> {
    return this.http.get(this.assignmentsUrl, {
                  withCredentials: true
                })
                .map(this.extractData)
                .catch(this.handleError);
  };

  saveAssignment(assignment) {
    if (assignment.id === 0) {
      return this.http.post(this.assignmentsUrl, {
                    withCredentials: true
                  })
                  .map(this.extractData)
                  .catch(this.handleError);
    } else {
      return this.http.put(this.assignmentsUrl, {
                    withCredentials: true
                  })
                  .map(this.extractData)
                  .catch(this.handleError);
    }
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
