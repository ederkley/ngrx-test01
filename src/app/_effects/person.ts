import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { AppState } from '../_reducers';
import { PersonActionTypes, PersonActions } from '../_actions/person-actions';
import { PersonService } from '../_services/person.service';


@Injectable()
export class PersonEffects {
    constructor (
        private update$: Actions,
        private personActions: PersonActions,
        private svc: PersonService,
    ) {}

    @Effect() loadHeroes$ = this.update$
        .ofType(PersonActionTypes.LOAD_PEOPLE)
        .switchMap(() => this.svc.getPeople())
        .map(people => this.personActions.loadPeopleSuccess(people));

};
