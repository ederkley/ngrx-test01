import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { type } from '../util';
import { Assignment } from '../_models/person';

// Person Filter Action Constants
export const StaffFilterActionTypes = {
   SHOW_ALL: type('[StaffFilter] Show all'),
   SHOW_EXSTAFF: type('[StaffFilter] Show former staff'),
   SHOW_CURRENT: type('[StaffFilter] Show current positions'),
   SHOW_ACTUAL_POS: type('[StaffFilter] Show actual positions'),
   SHOW_EXECUTIVE: type('[StaffFilter] Show executive')
 };

@Injectable()
export class StaffFilterActions {

    loadAssignments(): Action {
        return {
            type: StaffFilterActionTypes.SHOW_ALL
        };
    };
};
