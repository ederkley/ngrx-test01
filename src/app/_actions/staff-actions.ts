import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { type } from '../util';
import { Staff, Person, Assignment } from '../_models/person';

// Staff Action Constants - local model so no effects required
export const StaffActionTypes = {
   ADD_STAFF: type('[Staff] Add staff'),
   DELETE_STAFF: type('[Staff] Delete person'),
   LOAD_STAFF: type('[Staff] Load staff'),
   SELECT_STAFF: type('[Staff] Select staff'),
   UPDATE_ASSIGNMENTS: type('[Staff] Update assignments of selected staff'),
   TOGGLE_ASSIGNMENT_SORT: type('[Staff] Toggle sort assignment list order')
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

    addStaff(person: Person, assignment: Assignment): Action {
        return {
            type: StaffActionTypes.ADD_STAFF,
            payload: { 
                person: person, 
                assignment: assignment
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
    
    toggleSortAssignmentListOrder(): Action {
        return { type: StaffActionTypes.TOGGLE_ASSIGNMENT_SORT };
    };
};
