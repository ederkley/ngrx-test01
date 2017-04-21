import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { type } from '../util';
import { Person, Assignment } from '../_models/person';

// Person Action Constants
export const PersonActionTypes = {
   GET_PERSON: type('[Person] Get person'),
   GET_PERSON_SUCCESS: type('[Person] Get person success'),
   ADD_PERSON: type('[Person] Add person'),
   ADD_PERSON_SUCCESS: type('[Person] Add person success'),
   SAVE_PERSON: type('[Person] Save person'),
   SAVE_PERSON_SUCCESS: type('[Person] Save person success'),
   DELETE_PERSON: type('[Person] Delete person'),
   DELETE_PERSON_SUCCESS: type('[Person] Delete person success'),
   LOAD_PEOPLE: type('[Person] Load people'),
   LOAD_PEOPLE_SUCCESS: type('[Person] Load people success'),
   SELECT_PERSON: type('[Person] Select person')
};

@Injectable()
export class PersonActions {
    loadPeople(): Action {
        return {
            type: PersonActionTypes.LOAD_PEOPLE
        };
    };

    loadPeopleSuccess(people: Person[]): Action {
        return {
            type: PersonActionTypes.LOAD_PEOPLE_SUCCESS,
            payload: people
        };
    };

    getPerson(id: number): Action {
        return {
            type: PersonActionTypes.GET_PERSON,
            payload: id
        };
    }

    getPersonSuccess(person: Person): Action {
        return {
            type: PersonActionTypes.GET_PERSON_SUCCESS,
            payload: person
        };
    }

    savePerson(person: Person): Action {
        return {
            type: PersonActionTypes.SAVE_PERSON,
            payload: person
        };
    }

    savePersonSuccess(person: Person): Action {
        return {
            type: PersonActionTypes.SAVE_PERSON_SUCCESS,
            payload: person
        };
    }

    addPerson(person: Person): Action {
        return {
            type: PersonActionTypes.ADD_PERSON,
            payload: person
        };
    }

    addPersonSuccess(person: Person): Action {
        return {
            type: PersonActionTypes.ADD_PERSON_SUCCESS,
            payload: person
        };
    }
    
    deletePerson(person: Person): Action {
        return {
            type: PersonActionTypes.DELETE_PERSON,
            payload: person
        };
    }

    deletePersonSuccess(person: Person): Action {
        return {
            type: PersonActionTypes.DELETE_PERSON_SUCCESS,
            payload: person
        };
    }

    selectPerson(person: Person): Action {
        return {
            type: PersonActionTypes.SELECT_PERSON,
            payload: person
        };
    }
};
