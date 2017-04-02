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

    @Effect() loadHeroes$ = this.update$
        .ofType(AssignmentActionTypes.LOAD_ASSIGNMENTS)
        .switchMap(() => this.svc.getAssignments())
        .map(assignments => this.assignmentActions.loadAssignmentsSuccess(assignments));

};
