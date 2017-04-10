import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
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
  public selectedAssignment: Assignment;
  public sortedAssignments: Observable<Assignment[]>;
  @Input() personId: number;
  @Output() selectAssignment: EventEmitter<Assignment> = new EventEmitter<Assignment>();

  constructor(
    private _store: Store<AppState>,
    private assignmentActions: AssignmentActions,
    private staffActions: StaffActions,
  ) { 
    //this.selectedAssignment = _store.select('selectAssignment');
    // update assignment sort order whenever selectStaff changes
    this.sortedAssignments = _store.select('selectStaff').let(staffReducer.getSortedAssignments());
    this.sortAssignmentListAsc = _store.select('selectStaff').let(staffReducer.getSortAssignmentListAsc());
  };

  ngOnInit() {
  }

  changeSort() {
    this._store.dispatch(this.staffActions.toggleSortAssignmentListOrder());
  };

}
