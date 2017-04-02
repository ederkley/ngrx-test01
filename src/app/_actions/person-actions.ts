import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { type } from '../util';

// Person Action Constants
export const PersonActionTypes = {
   ADD_PERSON: type('[Person] Add person'),
   ADD_PERSON_SUCCESS: type('[Person] Add person success'),
   SAVE_PERSON: type('[Person] Save person'),
   SAVE_PERSON_SUCCESS: type('[Person] Save person success'),
   DELETE_PERSON: type('[Person] Delete person'),
   DELETE_PERSON_SUCCESS: type('[Person] Delete person success'),
   LOAD_PEOPLE: type('[Person] Load people'),
   LOAD_PEOPLE_SUCCESS: type('[Person] Load people success')
};

@Injectable()
export class PersonActions {
    loadPeople(): Action {
        return {
            type: PersonActionTypes.LOAD_PEOPLE
        };
    };

    loadPeopleSuccess(people): Action {
        return {
            type: PersonActionTypes.LOAD_PEOPLE_SUCCESS,
            payload: people
        };
    };
};
