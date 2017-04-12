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

    @Effect() loadPeople$ = this.update$
        .ofType(PersonActionTypes.LOAD_PEOPLE)
        .switchMap(() => this.svc.getPeople())
        .map(people => this.personActions.loadPeopleSuccess(people));

    @Effect() getPerson$ = this.update$
        .ofType(PersonActionTypes.GET_PERSON)
        .map(action => action.payload)
        .switchMap(id => this.svc.getPerson(id))
        .map(person => this.personActions.getPersonSuccess(person));

    @Effect() savePerson$ = this.update$
        .ofType(PersonActionTypes.SAVE_PERSON)
        .map(action => action.payload)
        .switchMap(person => this.svc.savePerson(person))
        .map(person => this.personActions.savePersonSuccess(person));

    @Effect() addPerson$ = this.update$
        .ofType(PersonActionTypes.ADD_PERSON)
        .map(action => action.payload)
        .switchMap(person => this.svc.savePerson(person))
        .map(person => this.personActions.addPersonSuccess(person));

    @Effect() deletePerson$ = this.update$
        .ofType(PersonActionTypes.DELETE_PERSON)
        .map(action => action.payload)
        .switchMap(person => this.svc.deletePerson(person))
        .map(person => this.personActions.deletePersonSuccess(person));
        
};
