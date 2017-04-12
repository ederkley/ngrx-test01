import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';
import {Store} from '@ngrx/store';

import { AppState } from '../_reducers';
import { Assignment } from '../_models/person';
import { AssignmentActions } from '../_actions';
//import * as staffReducer from '../_reducers/staff.reducer';
import * as assignmentsReducer from '../_reducers/assignments.reducer';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html'
})
export class AssignmentListComponent implements OnInit {
  public selectedAssignment: Observable<Assignment>;
  public sortAssignmentListAsc: Observable<boolean>;
  public sortedAssignments: Observable<Assignment[]>;

  constructor(
    private _store: Store<AppState>,
    private assignmentActions: AssignmentActions
    //private staffActions: StaffActions,
  ) { 
    /*
    this.selectedAssignment = _store.select(state => state.assignmentState).let(assignmentsReducer.getSelectedAssignment());
    // update assignment sort order whenever selectStaff changes
    
    this.sortedAssignments = Observable.combineLatest(
      _store.select(state => state.staffState).let(staffReducer.getSelectedStaff()),
      _store.select(state => state.assignmentState).let(assignmentsReducer.getAssignments()),
      _store.select(state => state.assignmentState).let(assignmentsReducer.getSortAsc())
    ).let(assignmentsReducer.getSortedAssignmentsList());
    
    // clear selected Assignment if sorted Assignment List changes
    //this.sortedAssignments.subscribe(state => this._store.dispatch(this.assignmentActions.selectAssignment(undefined)));
    this.sortAssignmentListAsc = _store.select(state => state.assignmentState).let(assignmentsReducer.getSortAsc());
    */
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
