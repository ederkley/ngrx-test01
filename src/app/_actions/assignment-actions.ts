import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { type } from '../util';
import { Assignment } from '../_models/person';

// Assignment Action Constants
export const ActionTypes = {
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
   SET_POSITIONS: type('[Assignment] Set positions'),
   TOGGLE_ASSIGNMENT_SORT: type('[Assignment] Toggle assignment list sort order'),
   SET_HAS_LOADED: type('[Assignment] Set whether assignments have successfully loaded')
};


export class LoadAssignmentsAction implements Action {
  type = ActionTypes.LOAD_ASSIGNMENTS;

  constructor() { }
}


export class LoadAssignmentsSuccessAction implements Action {
  type = ActionTypes.LOAD_ASSIGNMENTS_SUCCESS;

  constructor(public payload: Assignment[]) { }
}

export type AssnActions
  = LoadAssignmentsAction
  | LoadAssignmentsSuccessAction;

@Injectable()
export class AssignmentActions {
    loadAssignments(): Action {
        return {
            type: ActionTypes.LOAD_ASSIGNMENTS
        };
    };

    loadAssignmentsSuccess(assignments: Assignment[]): Action {
        return {
            type: ActionTypes.LOAD_ASSIGNMENTS_SUCCESS,
            payload: assignments
        };
    };

    getAssignment(id: number): Action {
        return {
            type: ActionTypes.GET_ASSIGNMENT,
            payload: id
        };
    }

    getAssignmentSuccess(assignment: Assignment): Action {
        return {
            type: ActionTypes.GET_ASSIGNMENT_SUCCESS,
            payload: assignment
        };
    }

    saveAssignment(assignment: Assignment): Action {
        return {
            type: ActionTypes.SAVE_ASSIGNMENT,
            payload: assignment
        };
    }

    saveAssignmentSuccess(assignment: Assignment): Action {
        return {
            type: ActionTypes.SAVE_ASSIGNMENT_SUCCESS,
            payload: assignment
        };
    }

    addAssignment(assignment: Assignment): Action {
        return {
            type: ActionTypes.ADD_ASSIGNMENT,
            payload: assignment
        };
    }

    addAssignmentSuccess(assignment: Assignment): Action {
        return {
            type: ActionTypes.ADD_ASSIGNMENT_SUCCESS,
            payload: assignment
        };
    }

    deleteAssignment(assignment: Assignment): Action {
        return {
            type: ActionTypes.DELETE_ASSIGNMENT,
            payload: assignment
        };
    }

    deleteAssignmentSuccess(assignment: Assignment): Action {
        return {
            type: ActionTypes.DELETE_ASSIGNMENT_SUCCESS,
            payload: assignment
        };
    }

    selectAssignment(assignment: Assignment): Action {
        return {
            type: ActionTypes.SELECT_ASSIGNMENT,
            payload: assignment
        };
    };

    setPositions(assignments, positions): Action {
        return {
            type: ActionTypes.SET_POSITIONS,
            payload: {
                assignments: assignments,
                positions: positions
            }
        };
    };
    
    toggleSortOrder(): Action {
        return { type: ActionTypes.TOGGLE_ASSIGNMENT_SORT };
    };

    setHasLoaded(hasLoaded: boolean): Action {
        return {
            type: ActionTypes.SET_HAS_LOADED,
            payload: hasLoaded
        };
    };
};
