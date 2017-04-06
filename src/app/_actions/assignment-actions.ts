import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { type } from '../util';
import { Assignment } from '../_models/person';

// Assignment Action Constants
export const AssignmentActionTypes = {
   GET_ASSIGNMENT: type('[Assignment] Get assignment'),
   GET_ASSIGNMENT_SUCCESS: type('[Assignment] Get assignment assignment'),
   ADD_ASSIGNMENT: type('[Assignment] Add assignment'),
   ADD_ASSIGNMENT_SUCCESS: type('[Assignment] Add assignment success'),
   SAVE_ASSIGNMENT: type('[Assignment] Save assignment'),
   SAVE_ASSIGNMENT_SUCCESS: type('[Assignment] Save assignment success'),
   DELETE_ASSIGNMENT: type('[Assignment] Delete assignment'),
   DELETE_ASSIGNMENT_SUCCESS: type('[Assignment] Delete assignment success'),
   LOAD_ASSIGNMENTS: type('[Assignment] Load assignments'),
   LOAD_ASSIGNMENTS_SUCCESS: type('[Assignment] Load assignments success'),
   SELECT_ASSIGNMENT: type('[Assignment] Select assignment'),
   SET_POSITIONS: type('[Assignment] Set positions')
};

@Injectable()
export class AssignmentActions {
    loadAssignments(): Action {
        return {
            type: AssignmentActionTypes.LOAD_ASSIGNMENTS
        };
    };

    loadAssignmentsSuccess(assignments: Assignment[]): Action {
        return {
            type: AssignmentActionTypes.LOAD_ASSIGNMENTS_SUCCESS,
            payload: assignments
        };
    };

    getAssignment(id: number): Action {
        return {
            type: AssignmentActionTypes.GET_ASSIGNMENT,
            payload: id
        };
    }

    getAssignmentSuccess(assignment: Assignment): Action {
        return {
            type: AssignmentActionTypes.GET_ASSIGNMENT_SUCCESS,
            payload: assignment
        };
    }

    saveAssignment(assignment: Assignment): Action {
        return {
            type: AssignmentActionTypes.SAVE_ASSIGNMENT,
            payload: assignment
        };
    }

    saveAssignmentSuccess(assignment: Assignment): Action {
        return {
            type: AssignmentActionTypes.SAVE_ASSIGNMENT_SUCCESS,
            payload: assignment
        };
    }

    addAssignment(assignment: Assignment): Action {
        return {
            type: AssignmentActionTypes.ADD_ASSIGNMENT,
            payload: assignment
        };
    }

    addAssignmentSuccess(assignment: Assignment): Action {
        return {
            type: AssignmentActionTypes.ADD_ASSIGNMENT_SUCCESS,
            payload: assignment
        };
    }

    deleteAssignment(assignment: Assignment): Action {
        return {
            type: AssignmentActionTypes.DELETE_ASSIGNMENT,
            payload: assignment
        };
    }

    deleteAssignmentSuccess(assignment: Assignment): Action {
        return {
            type: AssignmentActionTypes.DELETE_ASSIGNMENT_SUCCESS,
            payload: assignment
        };
    }

    selectAssignment(assignment: Assignment): Action {
        return {
            type: AssignmentActionTypes.SELECT_ASSIGNMENT,
            payload: assignment
        };
    };

    setPositions(positions): Action {
        return {
            type: AssignmentActionTypes.SET_POSITIONS,
            payload: positions
        };
    }
};
