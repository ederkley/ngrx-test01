import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/let';
import {Store, provideStore} from '@ngrx/store';

import { AppState } from './_reducers';
import { PersonActions, AssignmentActions, PositionActions } from './_actions';
import { Person, Position, Assignment, Staff } from './_models/person';
import * as peopleReducer from './_reducers/people.reducer';
import * as staffReducer from './_reducers/staff.reducer';
import * as peopleFilterReducer from './_reducers/people-filter.reducer';

@Component({
    selector: 'app-ngrx',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public staffModel: Observable<Staff[]>;
  public staffListView: Observable<Staff[]>;
  public filter : string;
  public defaultFilter = peopleFilterReducer.ActionTypes.SHOW_EXECUTIVE;
  public selectedPerson: Staff;
  private _addingPerson = false;
  private _addingAssignment = false;
  errorMessage: string;

  constructor(
    private _store: Store<AppState>,
    private personActions: PersonActions,
    private assignmentActions: AssignmentActions,
    private positionActions: PositionActions
  ) {    
    this.staffModel = Observable.combineLatest(
        _store.select('people'),
        _store.select('assignments'),
        _store.select('positions')
      )
      .let(staffReducer.getStaffModel());
    this.staffListView = Observable.combineLatest(
        _store.select('staff'),
        _store.select('peopleFilter')
      )
      .let(peopleReducer.getStaffListView());
  };

  ngOnInit() {
    this._store.dispatch(this.personActions.loadPeople());
    this._store.dispatch(this.assignmentActions.loadAssignments());
    this._store.dispatch(this.positionActions.loadPositions());
  };

  updateFilter(newFilter : string) {
    this.filter = newFilter;
    this._store.dispatch({type: newFilter});
  };

  addNewPerson() {
    this.selectedPerson = undefined;
    this._addingPerson = true;
  };

  selectPerson(staff: Staff) {
    this.selectedPerson = staff;
  };

  updateStaff(staff: Staff) {
    if (!staff) {
      this._addingPerson = false;
    } else {
      console.log(staff);
    }
  }

  addAssignment() {
    this._addingAssignment = true;
  }

  updateAssignment(assignment) {
    if (assignment) {
      let newAssignment = new Assignment(this.selectedPerson.person.id, assignment.positionId, assignment.acting, assignment.startDate, assignment.endDate, assignment.position);
      console.dir(newAssignment);
      this._store.dispatch(this.assignmentActions.addAssignment(newAssignment));
    }
    this._addingAssignment = false;
  }

}


