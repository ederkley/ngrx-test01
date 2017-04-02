import { Action } from '@ngrx/store';
import * as _ from 'lodash';

import { Assignment } from '../_models/person';
import { AssignmentActionTypes } from '../_actions';

export type AssignmentState = Assignment[];
const initialState: AssignmentState = [];

// remember to avoid mutation within reducers
export const assignments = (state: AssignmentState = initialState, action: Action): AssignmentState => {
    switch (action.type) {
        case AssignmentActionTypes.ADD_ASSIGNMENT_SUCCESS: 
            return [ ...state, action.payload ];
        case AssignmentActionTypes.SAVE_ASSIGNMENT_SUCCESS: {
            let index = _.findIndex(state, {id: action.payload.id});
            if (index >= 0) {
                return [
                    ...state.slice(0, index),
                    action.payload,
                    ...state.slice(index + 1)
                ];
            }
            return state;
        }
        case AssignmentActionTypes.DELETE_ASSIGNMENT_SUCCESS:{
            return state.filter(assignment => {
                return assignment.id !== action.payload.id;
            });
        }
        case AssignmentActionTypes.LOAD_ASSIGNMENTS_SUCCESS:
            return action.payload;
        // always have default return of previous state when action is not relevant
        default:
            return state;
    };
};
