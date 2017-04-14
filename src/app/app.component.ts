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
  public peopleView$: Observable<any>;
  public stateModel$: Observable<any>;
  public filter : string;
  public defaultFilter = StaffFilterActionTypes.SHOW_EXECUTIVE;
  public selectedPerson$: Observable<Person>;
  private _addingPerson = false;
  private _selectedPerson = false;
  public hasLoaded$: Observable<boolean>;
  errorMessage: string;

  constructor(
    private _store: Store<AppState>,
    private personActions: PersonActions,
    private assignmentActions: AssignmentActions,
    private positionActions: PositionActions
  ) {
    // set hasLoaded flag when people, assignments and positions finished loading
    this.hasLoaded$ = Observable.combineLatest(
      _store.select(state => state.peopleState).let(peopleReducer.getHasLoaded$()),
      _store.select(state => state.assignmentState).let(assignmentReducer.getHasLoaded$()),
      _store.select(state => state.positionState).let(positionReducer.getHasLoaded$())
    ).map(([peopleHasLoaded, assignmentsHasLoaded, positionsHasLoaded]) => !!peopleHasLoaded && !!assignmentsHasLoaded && !!positionsHasLoaded);    

    // update staff list whenever people, assignments, positions or filter changes
    this.peopleView$ = Observable.combineLatest(
        _store.select(state => state.peopleState),
        _store.select(state => state.staffFilterState),
        _store.select(state => state.assignmentState),
        _store.select(state => state.positionState)
    ).let(staffFilterReducer.getStaffListView());

    // update total people whenever people changes
    this.people$ = _store.select(state => state.peopleState).let(peopleReducer.getPeople$());
    
    // update observable of all people whenever peopleState changes
    this.selectedPerson$ = _store.select(state => state.peopleState).let(peopleReducer.getSelectedPerson$());
    
    // load people, assignments and positions
    this._store.dispatch(this.personActions.loadPeople());
    this._store.dispatch(this.assignmentActions.loadAssignments());
    this._store.dispatch(this.positionActions.loadPositions());

    // set default filter
    this.updateFilter(this.defaultFilter);
  };

  ngOnInit() {
  };

  updateFilter(newFilter : string) {
    this.filter = newFilter;
    this._selectedPerson = false;
    this._store.dispatch({type: newFilter});
    this._store.dispatch(this.personActions.selectPerson(undefined));
  };

  addNewPerson() {
    this._addingPerson = true;
    //this._store.dispatch(this.staffActions.selectStaff(undefined));
  };

  selectPerson(person: Person) {
    this._selectedPerson = true;
    this._store.dispatch(this.personActions.selectPerson(person));
  };

  updatePerson(person: Person) {
    if (person) {
      // save change
    } else {
      this._addingPerson = false;
      this._selectedPerson = false;
      this._store.dispatch(this.personActions.selectPerson(undefined));
    };
  };

  deleteLastPerson() {
      //this._store.dispatch(this.personActions.deletePerson(this.people[0]));

  }



}
