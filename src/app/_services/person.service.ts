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

  // PEOPLE API CALLS

  getPeople(): Observable<Person[]> {
    return this.http.get(this.peopleUrl, {
                  withCredentials: true
                })
               .map(this.extractData)
               .catch(this.handleError);
  };

  getPerson(id: number): Observable<Person> {
    return this.http.get(this.peopleUrl + id, {
                  withCredentials: true
                })
                .map(this.extractData)
                .catch(this.handleError);
  };

  savePerson(person: Person) {
    if (person.id === 0) {
      return this.http.post(this.peopleUrl, person, {
                    withCredentials: true
                  })
                  .map(this.extractData)
                  .catch(this.handleError);
    } else {
      return this.http.put(this.peopleUrl + person.id, person, {
                    withCredentials: true
                  })
                  .map(this.extractData)
                  .catch(this.handleError);
    }
  };
  
  deletePerson(person: Person) {
    return this.http.delete(this.peopleUrl + person.id, {
                  withCredentials: true
                })
                .map(this.extractData)
                .catch(this.handleError);
  }

  // POSITION API CALLS

  getPositions(): Observable<Position[]> {
    return this.http.get(this.positionsUrl, {
                  withCredentials: true
                })
               .map(this.extractData)
               .catch(this.handleError);
  };

  getPosition(id: number): Observable<Position> {
    return this.http.get(this.positionsUrl + id, {
                  withCredentials: true
                })
                .map(this.extractData)
                .catch(this.handleError);
  };

  savePosition(position: Position) {
    if (position.id === 0) {
      return this.http.post(this.positionsUrl, position, {
                    withCredentials: true
                  })
                  .map(this.extractData)
                  .catch(this.handleError);
    } else {
      return this.http.put(this.positionsUrl + position.id, position, {
                    withCredentials: true
                  })
                  .map(this.extractData)
                  .catch(this.handleError);
    }
  };
  
  deletePosition(position: Position) {
    return this.http.delete(this.positionsUrl + position.id, {
                  withCredentials: true
                })
                .map(this.extractData)
                .catch(this.handleError);
  }

  // ASSIGNMENT API CALLS

  getAssignments(): Observable<Assignment[]> {
    return this.http.get(this.assignmentsUrl, {
                  withCredentials: true
                })
               .map(this.extractData)
               .catch(this.handleError);
  };

  getAssignment(id: number): Observable<Assignment> {
    return this.http.get(this.assignmentsUrl + id, {
                  withCredentials: true
                })
                .map(this.extractData)
                .catch(this.handleError);
  };

  saveAssignment(assignment: Assignment) {
    if (assignment.id === 0) {
      return this.http.post(this.assignmentsUrl, assignment, {
                    withCredentials: true
                  })
                  .map(this.extractData)
                  .catch(this.handleError);
    } else {
      return this.http.put(this.assignmentsUrl + assignment.id, assignment, {
                    withCredentials: true
                  })
                  .map(this.extractData)
                  .catch(this.handleError);
    }
  };
  
  deleteAssignment(assignment: Assignment) {
    return this.http.delete(this.assignmentsUrl + assignment.id, {
                  withCredentials: true
                })
                .map(this.extractData)
                .catch(this.handleError);
  }

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
