import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';

import { Global } from '../global';
import { Person, Position, Assignment, Staff } from '../_models/person';
import { getPosition } from '../_reducers/positions.reducer';
import { AppState } from '../_reducers';


@Injectable()
export class PersonService {   

  private peopleUrl = Global.BASE_API_URL + 'people/';
  private positionsUrl = Global.BASE_API_URL + 'positions/';
  private assignmentsUrl = Global.BASE_API_URL + 'assignments/';
  private assignments$: Observable<Assignment[]>;
  private positions$: Observable<Position[]>;
  private people$: Observable<Person[]>
  private _id = 5000;

  newId(): number {
    return this._id++;
  }

  constructor(
    private _http: Http,
    private _store: Store<AppState>
  ) { 
    this.assignments$ = _store.select('assignments');
    this.positions$ = _store.select('positions');
    this.people$ = _store.select('people');    
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || { };
  }

  // PEOPLE API CALLS

  getPeople(): Observable<Person[]> {
    return this._http.get(this.peopleUrl, Global.HEADER)
                .map(this.extractData)
                .catch(this.handleError);
  };

  getPerson(id: number): Observable<Person> {
    return this._http.get(this.peopleUrl + id, Global.HEADER)
                .map(this.extractData)
                .catch(this.handleError);
  };

  savePerson(person: Person): Observable<Person> {
    if (person.id == 0) {
      // remove when no longer mocking
      person.id = this.newId();
      return this._http.post(this.peopleUrl, person, Global.HEADER)
                  .map(this.extractData)
                  .catch(this.handleError);
    } else {
      return this._http.put(this.peopleUrl + person.id, person, Global.HEADER)
                  .map(this.extractData)
                  .catch(this.handleError);
    }
  };
  
  deletePerson(person: Person): Observable<Person> {
    return this._http.delete(this.peopleUrl + person.id, Global.HEADER)
                .map(this.extractData)
                .catch(this.handleError);
  }

  // POSITION API CALLS

  getPositions(): Observable<Position[]> {
    return this._http.get(this.positionsUrl, Global.HEADER)
               .map(this.extractData)
               .catch(this.handleError);
  };

  getPosition(id: number): Observable<Position> {
    return this._http.get(this.positionsUrl + id, Global.HEADER)
                .map(this.extractData)
                .catch(this.handleError);
  };

  savePosition(position: Position): Observable<Position> {
    if (position.id == 0) {
      // remove when no longer mocking
      position.id = this.newId();
      return this._http.post(this.positionsUrl, position, Global.HEADER)
                  .map(this.extractData)
                  .catch(this.handleError);
    } else {
      return this._http.put(this.positionsUrl + position.id, position, Global.HEADER)
                  .map(this.extractData)
                  .catch(this.handleError);
    }
  };
  
  deletePosition(position: Position): Observable<Position> {
    return this._http.delete(this.positionsUrl + position.id, Global.HEADER)
                .map(this.extractData)
                .catch(this.handleError);
  }

  // ASSIGNMENT API CALLS

  getAssignments(): Observable<Assignment[]> {
    return this._http.get(this.assignmentsUrl, Global.HEADER)
                .map(this.extractData)
                .catch(this.handleError);
  };

  getAssignment(id: number): Observable<Assignment> {
    return this._http.get(this.assignmentsUrl + id, Global.HEADER)
                .map(this.extractData)
                .catch(this.handleError);
  };

  saveAssignment(assignment: Assignment): Observable<Assignment> {
    if (assignment.id == 0) {
      // remove when no longer mocking
      assignment.id = this.newId();
      console.log(assignment);
      return this._http.post(this.assignmentsUrl, assignment, Global.HEADER)
                  .map(this.extractData)
                  .catch(this.handleError);
    } else {
      return this._http.put(this.assignmentsUrl + assignment.id, assignment, Global.HEADER)
                  .map(this.extractData)
                  .catch(this.handleError);
    };
  };
  
  deleteAssignment(assignment: Assignment): Observable<Assignment> {
    return this._http.delete(this.assignmentsUrl + assignment.id, Global.HEADER)
                .map(this.extractData)
                .catch(this.handleError);
  };


  // ERROR-HANDLER

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
