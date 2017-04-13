import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';

import { AppState } from '../_reducers';
import { AssignmentActions, AssignmentActionTypes } from '../_actions/assignment.actions';
import { PersonService } from '../_services/person.service';

    /*
  search$: Observable<Action> = this.actions$
    .ofType(book.AssignmentActionTypes.SEARCH)
    .debounceTime(300)
    .map(toPayload)
    .switchMap(query => {
      if (query === '') {
        return empty();
      }

      const nextSearch$ = this.actions$.ofType(book.AssignmentActionTypes.SEARCH).skip(1);

      return this.googleBooks.searchBooks(query)
        .takeUntil(nextSearch$)
        .map(books => new book.SearchCompleteAction(books))
        .catch(() => of(new book.SearchCompleteAction([])));
    });*/


@Injectable()
export class AssignmentEffects {
    constructor (
        private update$: Actions,
        private assignmentActions: AssignmentActions,
        private svc: PersonService,
    ) {}

    @Effect() loadAssignments$ = this.update$
        .ofType(AssignmentActionTypes.LOAD_ASSIGNMENTS)
        .switchMap(() => this.svc.getAssignments())
        .map(assignments => this.assignmentActions.loadAssignmentsSuccess(assignments));

    @Effect() getAssignment$ = this.update$
        .ofType(AssignmentActionTypes.GET_ASSIGNMENT)
        .map(action => action.payload)
        .switchMap(id => this.svc.getAssignment(id))
        .map(assignment => this.assignmentActions.getAssignmentSuccess(assignment));

    @Effect() saveAssignment$ = this.update$
        .ofType(AssignmentActionTypes.SAVE_ASSIGNMENT)
        .map(action => action.payload)
        .switchMap(assignment => this.svc.saveAssignment(assignment))
        .map(assignment => this.assignmentActions.saveAssignmentSuccess(assignment));

    @Effect() addAssignment$ = this.update$
        .ofType(AssignmentActionTypes.ADD_ASSIGNMENT)
        .map(action => action.payload)
        .switchMap(assignment => this.svc.saveAssignment(assignment))
        .map(assignment => this.assignmentActions.addAssignmentSuccess(assignment));

    @Effect() deleteAssignment$ = this.update$
        .ofType(AssignmentActionTypes.DELETE_ASSIGNMENT)
        .map(action => action.payload)
        .switchMap(assignment => this.svc.deleteAssignment(assignment))
        .map(assignment => this.assignmentActions.deleteAssignmentSuccess(assignment));
        
};
