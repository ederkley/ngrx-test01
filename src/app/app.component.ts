import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/let';

import {Store, provideStore} from '@ngrx/store';

import { Person, Position, newId } from './_models/person';
import { PersonService } from './_services/person.service';
import * as peopleReducer from './_reducers/people.reducer';
import * as assignmentReducer from './_reducers/assignments.reducer';
import * as positionReducer from './_reducers/positions.reducer';
import * as peopleFilterReducer from './_reducers/people-filter.reducer';

@Component({
    selector: 'app-ngrx',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public staffModel: Observable<any>;
  public filter;
  public defaultFilter = peopleFilterReducer.ActionTypes.SHOW_EXECUTIVE;
  errorMessage: string;

  constructor(
    private _store: Store<any>,
    private _personService: PersonService
  ) {    
      this.staffModel = Observable.combineLatest(
          _store.select('people'),
          _store.select('assignments'),
          _store.select('positions'),
          _store.select('peopleFilter')
        )
        .let(peopleReducer.getStaff());
  };

  ngOnInit() {
      Observable.forkJoin(
        this._personService.getPeople(),
        this._personService.getAssignments(),
        this._personService.getPositions()
      )
        .subscribe(([peopleList, assignmentList, positionList]) => {
          this._store.dispatch({type: peopleReducer.ActionTypes.LOAD_PEOPLE, payload: { people: peopleList } });
          this._store.dispatch({type: assignmentReducer.ActionTypes.LOAD_ASSIGNMENTS, payload: { assignments: assignmentList } });
          this._store.dispatch({type: positionReducer.ActionTypes.LOAD_POSITIONS, payload: { positions: positionList } });
        },
        error => this.errorMessage = <any>error);
  };

  updateFilter(newFilter) {
    this.filter = newFilter;
    this._store.dispatch({type: newFilter});
  }

}


