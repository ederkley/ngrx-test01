import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { type } from '../util';
import { Staff, Person, Assignment } from '../_models/person';

// Staff Action Constants - local model so no effects required
export const StaffActionTypes = {
   LOAD_STAFF: type('[Staff] Load staff'),
   SELECT_STAFF: type('[Staff] Select staff'),
   TOGGLE_STAFF_SORT: type('[Staff] Toggle staff list sort order')
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

    selectStaff(staff: Staff): Action {
        return {
            type: StaffActionTypes.SELECT_STAFF,
            payload: staff
        };
    };
    
    toggleSortOrder(): Action {
        return { type: StaffActionTypes.TOGGLE_STAFF_SORT };
    };
};
