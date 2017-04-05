import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { type } from '../util';
import { Staff, Person, Assignment } from '../_models/person';

// Staff Action Constants - local model so no effects required
export const StaffActionTypes = {
   ADD_STAFF: type('[Staff] Add staff'),
   SAVE_STAFF: type('[Staff] Save staff'),
   DELETE_STAFF: type('[Staff] Delete staff'),
   LOAD_STAFF: type('[Staff] Load staff'),
};

@Injectable()
export class StaffActions {
    loadStaff(people: Person[], assignments: Assignment[]): Action {
        return {
            type: StaffActionTypes.LOAD_STAFF,
            payload: { 
                people: people, 
                assignments: assignments
            }
        };
    };

    addStaff(person: Person, assignments: Assignment[]): Action {
        return {
            type: StaffActionTypes.ADD_STAFF,
            payload: { 
                person: person, 
                assignments: assignments
            }
        };
    }

    saveStaff(person: Person, assignments: Assignment[]): Action {
        return {
            type: StaffActionTypes.SAVE_STAFF,
            payload: { 
                person: person, 
                assignments: assignments
            }
        };
    }

    deleteStaff(person: Person): Action {
        return {
            type: StaffActionTypes.DELETE_STAFF,
            payload: person
        };
    }
};
