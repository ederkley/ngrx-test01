import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/skipUntil';
import {Store, provideStore} from '@ngrx/store';

import { AppState } from './_reducers';
import { PersonActions, AssignmentActions, PositionActions } from './_actions';
import { Person, Position, Assignment } from './_models/person';
import * as assignmentReducer from './_reducers/assignments.reducer';
import * as staffReducer from './_reducers/staff.reducer';
import * as positionReducer from './_reducers/positions.reducer';
import * as peopleReducer from './_reducers/people.reducer';
import * as staffFilterReducer from './_reducers/staff-filter.reducer';
import { StaffFilterActionTypes } from './_actions/staff-filter.actions';

@Component({
    selector: 'app-ngrx',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public people$: Observable<Person[]>;
  public people: Person[] = [];
  public peopleView$: Observable<any>;
  public stateModel$: Observable<any>;
  public filter : string;
  public defaultFilter = StaffFilterActionTypes.SHOW_EXSTAFF;
  public selectedPerson$: Observable<Person>;
  private _addingPerson = false;
  private _selectedPerson = false;
  public hasLoaded$: Observable<boolean>;
  errorMessage: string;
  public total: number = 0;
e
  constructor(
    private _store: Store<AppState>,
    private personActions: PersonActions,
    private assignmentActions: AssignmentActions,
    private positionActions: PositionActions
    //private staffActions: StaffActions
  ) {
    //this.people = _store.select(state => state.appState.staffState.peopleState).let(peopleReducer.getPeople());
    // load people, assignments and positions
          // update staff list whenever people, assignments, positions or filter changes and all finished loading
          
    this.hasLoaded$ = _store.select(state => state.appState.staffState).let(staffReducer.getHasLoaded())
    this.peopleView$ = Observable.combineLatest(
        _store.select(state => state.appState.staffState.peopleState),
        _store.select(state => state.appState.staffState.staffFilterState),        
    ).let(staffFilterReducer.getStaffListView());
    this.people$ = _store.select(state => state.appState.staffState.peopleState).let(peopleReducer.getPeople());
    this.people$.subscribe(state => this.people = state);
    
    // set hasLoaded flag when people, assignments and positions finished loading
    // update observable of all people whenever peopleState changes
    this.selectedPerson$ = _store.select(state => state.appState.staffState.peopleState).let(peopleReducer.getSelectedPerson());
    
    this._store.dispatch(this.personActions.loadPeople());
    this._store.dispatch(this.assignmentActions.loadAssignments());
    this._store.dispatch(this.positionActions.loadPositions());
  };

  ngOnInit() {
  };

  updateFilter(newFilter : string) {
    this.filter = newFilter;
    this._store.dispatch({type: newFilter});
  };

  addNewPerson() {
    this._addingPerson = true;
    //this._store.dispatch(this.staffActions.selectStaff(undefined));
  };

  selectPerson(person: Person) {
    this._selectedPerson = true;
    //this._store.dispatch(this.staffActions.selectStaff(staff));
  };

  updatePerson(person: Person) {
    if (person) {
      // save change
    } else {
      this._addingPerson = false;
      this._selectedPerson = false;
      //this._store.dispatch(this.staffActions.selectStaff(undefined));
    };
  };

  deleteLastPerson() {
      this._store.dispatch(this.personActions.deletePerson(this.people[0]));

  }



}
