import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';
import {Store} from '@ngrx/store';

import { AppState } from '../_reducers';
import { Person, Assignment } from '../_models/person';
import { AssignmentActions } from '../_actions';
import * as reducers from '../_reducers';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html'
})
export class AssignmentListComponent implements OnInit {
  public selectedPerson$: Observable<Person>;
  public selectedAssignment$: Observable<Assignment>;
  public sortAssignmentListAsc: Observable<boolean>;
  public sortedAssignments: Observable<Assignment[]>;

  constructor(
    private _store: Store<AppState>,
    private assignmentActions: AssignmentActions
    //private staffActions: StaffActions,
  ) { 
    //this.selectedPerson$ = _store.select(reducers.getPersonSelected$());
    //this.selectedAssignment$ = _store.select(state => state.assignmentState).let(assignmentsReducer.getSelectedAssignment$());
    // update assignment sort order whenever selectStaff changes
    /*
    this.sortedAssignments = Observable.combineLatest(
      this.selectedPerson$,
      _store.select(state => state.assignmentState).let(assignmentsReducer.getAssignments$()),
      _store.select(state => state.assignmentState).let(assignmentsReducer.getSortAsc$())
    ).let(assignmentsReducer.getSortedAssignmentsView$());
    */
    // clear selected Assignment if sorted Assignment List changes
    this.selectedAssignment$.subscribe(state => this._store.dispatch(this.assignmentActions.selectAssignment(undefined)));
    //this.sortAssignmentListAsc = _store.select(state => state.assignmentState).let(assignmentsReducer.getSortAsc$());    
  };

  ngOnInit() {
  }

  changeSort() {
    this._store.dispatch(this.assignmentActions.toggleSortOrder());
  };

  selectAssignment(assignment: Assignment) {
    this._store.dispatch(this.assignmentActions.selectAssignment(assignment));
  };

}
