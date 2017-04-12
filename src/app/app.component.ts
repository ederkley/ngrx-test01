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
//import * as staffReducer from './_reducers/staff.reducer';
import * as positionReducer from './_reducers/positions.reducer';
import * as peopleReducer from './_reducers/people.reducer';
import * as staffFilterReducer from './_reducers/staff-filter.reducer';

@Component({
    selector: 'app-ngrx',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public people$: Observable<Person[]>;
  public peopleView$: Observable<Person[]>;
  public filter : string;
  public defaultFilter = staffFilterReducer.ActionTypes.SHOW_EXECUTIVE;
  public selectedPerson$: Observable<Person>;
  private _addingPerson = false;
  private _selectedPerson = false;
  public hasLoaded = false;
  errorMessage: string;
  public people;

  constructor(
    private _store: Store<AppState>,
    private personActions: PersonActions,
    private assignmentActions: AssignmentActions,
    private positionActions: PositionActions
    //private staffActions: StaffActions
  ) {
    this.people = _store.select(state => state.peopleState).let(peopleReducer.getPeople());
    // load people, assignments and positions
    this._store.dispatch(this.personActions.loadPeople());
    this._store.dispatch(this.assignmentActions.loadAssignments());
    this._store.dispatch(this.positionActions.loadPositions());
    // set hasLoaded flag when people, assignments and positions finished loading
    Observable.combineLatest(
      _store.select(state => state.peopleState).let(peopleReducer.getHasLoaded()),
      _store.select(state => state.assignmentState).let(assignmentReducer.getHasLoaded()),
      _store.select(state => state.positionState).let(positionReducer.getHasLoaded())
    ).subscribe(([peopleHasLoaded, assignmentsHasLoaded, positionsHasLoaded]) => {
      this.hasLoaded = (!!peopleHasLoaded && !!assignmentsHasLoaded && !!positionsHasLoaded);
    });
    // update staff list whenever staff or filter changes
    this.peopleView$ = Observable.combineLatest(
      _store.select(state => state.peopleState).let(peopleReducer.getPeople()),
      _store.select(state => state.assignmentState).let(assignmentReducer.getAssignments()),
      _store.select(state => state.positionState).let(positionReducer.getPositions()),
      _store.select(state => state.staffFilterState)
    ).let(staffFilterReducer.getStaffListView());
    // update staff model whenever staff changes
    this.people$ = _store.select(state => state.peopleState).let(peopleReducer.getPeople());
    this.selectedPerson$ = _store.select(state => state.peopleState).let(peopleReducer.getSelectedPerson());
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

}
