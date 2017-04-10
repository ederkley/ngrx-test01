import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/let';
import {Store, provideStore} from '@ngrx/store';

import { AppState, stores } from './_reducers';
import { StaffActions, PersonActions, AssignmentActions, PositionActions } from './_actions';
import { Person, Position, Assignment, Staff } from './_models/person';
import * as assignmentReducer from './_reducers/assignments.reducer';
import * as staffReducer from './_reducers/staff.reducer';
import * as positionReducer from './_reducers/positions.reducer';
import * as peopleReducer from './_reducers/people.reducer';
import * as staffFilterReducer from './_reducers/staff-filter.reducer';

@Component({
    selector: 'app-ngrx',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public staffModel: Observable<Staff[]>;
  public staffListView: Observable<Staff[]>;
  public filter : string;
  public defaultFilter = staffFilterReducer.ActionTypes.SHOW_EXECUTIVE;
  //public selectedStaff: Observable<Staff>;
  private _addingPerson = false;
  private _selectedStaff = false;
  public hasLoaded: Observable<any>;
  errorMessage: string;

  constructor(
    private _store: Store<AppState>,
    private personActions: PersonActions,
    private assignmentActions: AssignmentActions,
    private positionActions: PositionActions,
    private staffActions: StaffActions
  ) {
    // load people, assignments and positions
    this._store.dispatch(this.personActions.loadPeople());
    this._store.dispatch(this.assignmentActions.loadAssignments());
    this._store.dispatch(this.positionActions.loadPositions());
    // set hasLoaded flag when people, assignments and positions finished loading
    this.hasLoaded = Observable.combineLatest(
      _store.select(stores.peopleState).let(peopleReducer.hasLoaded()),
      _store.select(stores.assignmentState).let(assignmentReducer.hasLoaded()),
      _store.select(stores.positionState).let(positionReducer.hasLoaded()));
    // set position on all assignments whenever positions change and after positions have been loaded
    Observable.combineLatest(
      _store.select(stores.positionState).let(positionReducer.getPositions()),
      _store.select(stores.positionState).let(positionReducer.hasLoaded())
    ).subscribe(([positions, positionsLoaded]) => {
      if (!!positionsLoaded) { 
        _store.dispatch(assignmentActions.setPositions(positions));
      };
    });
    // load staff when all loaded and positions set
    Observable.combineLatest(
      this.hasLoaded,
      _store.select(stores.assignmentState).let(assignmentReducer.hasSetPositions()),
      _store.select(stores.peopleState).let(peopleReducer.getPeople()),
      _store.select(stores.assignmentState).let(assignmentReducer.getAssignments())
    ).subscribe(([hasLoaded, positionsSet, people, assignments]) => {
      if ((!!hasLoaded && !!positionsSet)) {
        _store.dispatch(staffActions.loadStaff(people, assignments));
      };
    });
    // update staff list whenever staff or filter changes
    this.staffListView = Observable.combineLatest(
      _store.select(stores.staffState).let(staffReducer.getStaff()),
      _store.select(stores.staffFilterState)
    ).let(staffFilterReducer.getStaffListView());
    // update staff model whenever staff changes
    this.staffModel = _store.select(stores.staffState)
      .let(staffReducer.getStaffModel());
    // deselect staff whenever staffFilter changes
    _store.select(stores.staffFilterState).subscribe(staffFilter => {
      this._selectedStaff = false;
      _store.dispatch(staffActions.selectStaff(undefined));
    });
  };

  ngOnInit() {
  };

  updateFilter(newFilter : string) {
    this.filter = newFilter;
    this._store.dispatch({type: newFilter});
  };

  addNewPerson() {
    this._addingPerson = true;
    this._store.dispatch(this.staffActions.selectStaff(undefined));
  };

  selectStaff(staff: Staff) {
    this._selectedStaff = true;
    this._store.dispatch(this.staffActions.selectStaff(staff));
  };

  updateStaff(staff: Staff) {
    if (staff) {
      // save change
    } else {
      this._addingPerson = false;
      this._selectedStaff = false;
      this._store.dispatch(this.staffActions.selectStaff(undefined));
    };
  };

}
