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
   SELECT_STAFF: type('[Staff] Select staff'),
   UPDATE_ASSIGNMENTS: type('[Staff] Update assignments of selected staff')
};

@Injectable()
export class StaffActions {
    loadStaff(people, assignments): Action {
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
    };

    saveStaff(person: Person, assignments: Assignment[]): Action {
        return {
            type: StaffActionTypes.SAVE_STAFF,
            payload: { 
                person: person, 
                assignments: assignments
            }
        };
    };

    deleteStaff(staff: Staff): Action {
        return {
            type: StaffActionTypes.DELETE_STAFF,
            payload: staff
        };
    };

    selectStaff(staff: Staff): Action {
        return {
            type: StaffActionTypes.SELECT_STAFF,
            payload: staff
        };
    };

    updateAssignments(assignments): Action {
        return {
            type: StaffActionTypes.UPDATE_ASSIGNMENTS,
            payload: assignments
        };
    };
    
};
