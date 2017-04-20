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
  templateUrl: './assignment-list.component.html',
  styles: ['li.selected span { background-color: blue; color: white } ']
})
export class AssignmentListComponent implements OnInit {
  public sortedAssignmentAsc$: Observable<boolean>;
  public sortedAssignments$: Observable<Assignment[]>;
  private selectedAssignment$: Observable<Assignment>;

  constructor(
    private _store: Store<AppState>,
    private assignmentActions: AssignmentActions
  ) {
    this.sortedAssignments$ = _store.select(fromRoot.getAssignmentSortedView$);
    this.sortedAssignmentAsc$ = _store.select(fromRoot.getAssignmentSortOrderAsc$);
    this.selectedAssignment$ = _store.select(fromRoot.getAssignmentSelected$);
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
