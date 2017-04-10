import { Action } from '@ngrx/store';
import * as _ from 'lodash';

import { Assignment } from '../_models/person';
import { AssignmentActionTypes } from '../_actions';

export type AssignmentState = {
    assignmentsList: Assignment[];
    sortAsc: boolean
};

const initialState: AssignmentState = {
    assignmentsList: [],
    sortAsc: true
};

export type SelectAssignmentState = Assignment;
const initialSelectState: SelectAssignmentState = undefined;

// remember to avoid mutation within reducers
export const assignments = (state: AssignmentState = initialState, action: Action): AssignmentState => {
    switch (action.type) {
        case AssignmentActionTypes.ADD_ASSIGNMENT_SUCCESS:
            return Object.assign({}, state, { assignmentsList: [...state.assignmentsList, action.payload]});
        case AssignmentActionTypes.SAVE_ASSIGNMENT_SUCCESS: {
            let index = _.findIndex(state.assignmentsList, {id: action.payload.id});
            if (index >= 0) {
                return Object.assign({}, state, { assignmentsList: [
                    ...state.assignmentsList.slice(0, index),
                    action.payload,
                    ...state.assignmentsList.slice(index + 1)
                ] });
            }
            return state;
        }
        case AssignmentActionTypes.DELETE_ASSIGNMENT_SUCCESS:{
            return Object.assign({}, state, { assignmentsList: state.assignmentsList.filter(assignment => {
                return assignment.id != action.payload.id;
            }) });
        }
        case AssignmentActionTypes.LOAD_ASSIGNMENTS_SUCCESS:
            return Object.assign({}, state, { assignmentsList: action.payload });
        case AssignmentActionTypes.SET_POSITIONS:
            const positions = action.payload;
            return Object.assign({}, state, { assignmentsList: state.assignmentsList.map(assignment => {
                let newPosition: Position = positions.filter(position => position.id == assignment.positionId)[0]
                return Object.assign({}, assignment, { position: newPosition } );
            }) });
        case AssignmentActionTypes.TOGGLE_ASSIGNMENT_SORT:
            return Object.assign({}, state, { sortAsc: !state.sortAsc });
        // always have default return of previous state when action is not relevant
        default:
            return state;
    };
};


export const selectAssignment = (state: SelectAssignmentState = initialSelectState, action: Action): SelectAssignmentState => {
    switch (action.type) {
        case AssignmentActionTypes.SELECT_ASSIGNMENT:
            return action.payload;        
        // always have default return of previous state when action is not relevant
        default:
            return state;
    };
};

// SELECTORS

export const getAssignmentsList = () => state => {
    console.log('getAssignmentsList');
    return state.map(s => s.assignmentsList);
};

export const getSortAsc = () => state =>  {
    console.log('getSortAsc');
    return state.map(s => s.sortAsc);
};

export const getSortedAssignmentsList = () => state => {
    console.log('getSortedAssignmentsList');
    return state.map(([selectedStaff, assignments]) => {
        return assignments.assignmentsList
            .filter(assignment => assignment.personId == selectedStaff.staff.person.id)
            .sort((a, b) => {
                return assignments.sortAsc ? 
                new Date(b.startDate).getTime() - new Date(a.startDate).getTime() :
                new Date(a.startDate).getTime() - new Date(b.startDate).getTime() 
                });
        });
};
