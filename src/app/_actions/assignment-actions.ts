import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { type } from '../util';

// Person Action Constants
export const AssignmentActionTypes = {
   ADD_ASSIGNMENT: type('[Assignment] Add assignment'),
   ADD_ASSIGNMENT_SUCCESS: type('[Assignment] Add assignment success'),
   SAVE_ASSIGNMENT: type('[Assignment] Save assignment'),
   SAVE_ASSIGNMENT_SUCCESS: type('[Assignment] Save assignment success'),
   DELETE_ASSIGNMENT: type('[Assignment] Delete assignment'),
   DELETE_ASSIGNMENT_SUCCESS: type('[Assignment] Delete assignment success'),
   LOAD_ASSIGNMENTS: type('[Assignment] Load assignments'),
   LOAD_ASSIGNMENTS_SUCCESS: type('[Assignment] Load assignments success')
};

@Injectable()
export class AssignmentActions {
    loadAssignments(): Action {
        return {
            type: AssignmentActionTypes.LOAD_ASSIGNMENTS
        };
    };

    loadAssignmentsSuccess(assignments): Action {
        return {
            type: AssignmentActionTypes.LOAD_ASSIGNMENTS_SUCCESS,
            payload: assignments
        };
    };
};
