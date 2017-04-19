import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';
import {Store} from '@ngrx/store';

import { AppState } from '../_reducers';
import { Person, Assignment } from '../_models/person';
import { AssignmentActions } from '../_actions';
import * as fromRoot from '../_reducers';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html'
})
export class AssignmentListComponent implements OnInit {
  @Output() selectAssignment: EventEmitter<Assignment> = new EventEmitter<Assignment>();
  public sortAssignmentSortOrderAsc$: Observable<boolean>;
  public sortedAssignments$: Observable<Assignment[]>;

  constructor(
    private _store: Store<AppState>,
    private assignmentActions: AssignmentActions
  ) {
    this.sortedAssignments$ = _store.select(fromRoot.getAssignmentSortedView$);
    this.sortAssignmentSortOrderAsc$ = _store.select(fromRoot.getAssignmentSortOrderAsc$);
  };

  ngOnInit() {
  }

  changeSort() {
    this._store.dispatch(this.assignmentActions.toggleSortOrder());
  };

  onSelectAssignment(assignment: Assignment) {
    this._store.dispatch(this.assignmentActions.selectAssignment(assignment));
  };

};
