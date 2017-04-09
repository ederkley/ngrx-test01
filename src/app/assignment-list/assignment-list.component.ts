import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';
import {Store} from '@ngrx/store';

import { AppState } from '../_reducers';
import { Assignment } from '../_models/person';
import { AssignmentActions,StaffActions } from '../_actions';
import * as staffReducer from '../_reducers/staff.reducer';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html'
})
export class AssignmentListComponent implements OnInit {
  public sortAssignmentListAsc: Observable<boolean>;
  public selectedAssignment: Observable<Assignment>;
  public sortedAssignments: Observable<Assignment[]>;
  private _selectAssignment = false;
  private _addingAssignment = false;
  @Input() personId: number;

  constructor(
    private _store: Store<AppState>,
    private assignmentActions: AssignmentActions,
    private staffActions: StaffActions,
  ) { 
    this.selectedAssignment = _store.select('selectAssignment');
    // update assignment sort order whenever selectStaff changes
    this.sortedAssignments = _store.select('selectStaff').let(staffReducer.getSortedAssignments());
    this.sortAssignmentListAsc = _store.select('selectStaff').let(staffReducer.getSortAssignmentListAsc());
  };

  ngOnInit() {
  }

  selectAssignment(assignment: Assignment) {
    this._selectAssignment = true;
    this._store.dispatch(this.assignmentActions.selectAssignment(assignment));
  };

  addAssignment() {
    this._addingAssignment = true;
    this._store.dispatch(this.assignmentActions.selectAssignment(undefined));
  };

  updateAssignment(assignment) {
    if (assignment) {
      assignment = Object.assign({}, assignment, { personId: this.personId });
      this._store.dispatch(this.assignmentActions.addAssignment(assignment));
    } else {
      this._store.dispatch(this.assignmentActions.selectAssignment(undefined));
    }
    this._addingAssignment = false;
    this._selectAssignment = false;
  };

  changeSort() {
    this._store.dispatch(this.staffActions.toggleSortAssignmentListOrder());
  };

}
