import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';
import {Store} from '@ngrx/store';

import { AppState } from '../_reducers';
import { Assignment } from '../_models/person';
import { AssignmentActions,StaffActions } from '../_actions';
import * as assignmentsReducer from '../_reducers/assignments.reducer';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html'
})
export class AssignmentListComponent implements OnInit {
  public sortAssignmentListAsc: Observable<boolean>;
  public sortedAssignments: Observable<Assignment[]>;

  constructor(
    private _store: Store<AppState>,
    private assignmentActions: AssignmentActions,
    private staffActions: StaffActions,
  ) { 
    //this.selectedAssignment = _store.select('selectAssignment');
    // update assignment sort order whenever selectStaff changes
    this.sortedAssignments = Observable.combineLatest(
      _store.select('selectStaff'),
      _store.select('assignments')
    ).let(assignmentsReducer.getSortedAssignmentsList());
    this.sortAssignmentListAsc = _store.select('selectStaff').let(assignmentsReducer.getSortAsc());
  };

  ngOnInit() {
  }

  changeSort() {
    this._store.dispatch(this.assignmentActions.toggleSortOrder());
  };
  
  selectAssignment(assignment) {
    this._store.dispatch(this.assignmentActions.selectAssignment(assignment));
  };

}
