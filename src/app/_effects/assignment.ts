import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { AppState } from '../_reducers';
import { AssignmentActionTypes, AssignmentActions } from '../_actions/assignment-actions';
import { PersonService } from '../_services/person.service';


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
