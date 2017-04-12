import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';

import { AppState } from '../_reducers';
import * as _assignments from '../_actions/assignment-actions';
import { PersonService } from '../_services/person.service';


@Injectable()
export class AssignmentEffects2 {
    constructor(
        private update$: Actions, 
        private svc: PersonService,
    ) { };
  @Effect() loadAssignments$ = this.update$
    .ofType(_assignments.ActionTypes.LOAD_ASSIGNMENTS)
    .map(toPayload)
    .switchMap(() => this.svc.getAssignments())
    .map(assignments => new _assignments.LoadAssignmentsSuccessAction(assignments));
};
    /*
  search$: Observable<Action> = this.actions$
    .ofType(book.ActionTypes.SEARCH)
    .debounceTime(300)
    .map(toPayload)
    .switchMap(query => {
      if (query === '') {
        return empty();
      }

      const nextSearch$ = this.actions$.ofType(book.ActionTypes.SEARCH).skip(1);

      return this.googleBooks.searchBooks(query)
        .takeUntil(nextSearch$)
        .map(books => new book.SearchCompleteAction(books))
        .catch(() => of(new book.SearchCompleteAction([])));
    });*/


@Injectable()
export class AssignmentEffects {
    constructor (
        private update$: Actions,
        private assignmentActions: _assignments.AssignmentActions,
        private svc: PersonService,
    ) {}

    @Effect() loadAssignments$ = this.update$
        .ofType(_assignments.ActionTypes.LOAD_ASSIGNMENTS)
        .switchMap(() => this.svc.getAssignments())
        .map(assignments => this.assignmentActions.loadAssignmentsSuccess(assignments));

    @Effect() getAssignment$ = this.update$
        .ofType(_assignments.ActionTypes.GET_ASSIGNMENT)
        .map(action => action.payload)
        .switchMap(id => this.svc.getAssignment(id))
        .map(assignment => this.assignmentActions.getAssignmentSuccess(assignment));

    @Effect() saveAssignment$ = this.update$
        .ofType(_assignments.ActionTypes.SAVE_ASSIGNMENT)
        .map(action => action.payload)
        .switchMap(assignment => this.svc.saveAssignment(assignment))
        .map(assignment => this.assignmentActions.saveAssignmentSuccess(assignment));

    @Effect() addAssignment$ = this.update$
        .ofType(_assignments.ActionTypes.ADD_ASSIGNMENT)
        .map(action => action.payload)
        .switchMap(assignment => this.svc.saveAssignment(assignment))
        .map(assignment => this.assignmentActions.addAssignmentSuccess(assignment));

    @Effect() deleteAssignment$ = this.update$
        .ofType(_assignments.ActionTypes.DELETE_ASSIGNMENT)
        .map(action => action.payload)
        .switchMap(assignment => this.svc.deleteAssignment(assignment))
        .map(assignment => this.assignmentActions.deleteAssignmentSuccess(assignment));
        
};
