import { Action } from '@ngrx/store';
import * as _ from 'lodash';

import { Assignment } from '../_models/person';
import { AssignmentActionTypes } from '../_actions';

export type AssignmentState = {
    assignments: Assignment[];
    selectedAssignment: Assignment;
    sortAsc: boolean;
    hasLoaded: boolean;
    hasSetPositions: boolean;
};

const initialState: AssignmentState = {
    assignments: [],
    selectedAssignment: undefined,
    sortAsc: true,
    hasLoaded: false,
    hasSetPositions: false
};

// remember to avoid mutation within reducers
export const assignmentState = (state: AssignmentState = initialState, action: Action): AssignmentState => {
    switch (action.type) {
        case AssignmentActionTypes.ADD_ASSIGNMENT_SUCCESS:
            return Object.assign({}, state, { assignments: [...state.assignments, action.payload] });
        case AssignmentActionTypes.SAVE_ASSIGNMENT_SUCCESS: {
            let index = _.findIndex(state.assignments, {id: action.payload.id});
            if (index >= 0) {
                return Object.assign({}, state, [
                    ...state.assignments.slice(0, index),
                    action.payload,
                    ...state.assignments.slice(index + 1)
                ]);
            };
            return state;
        };
        case AssignmentActionTypes.DELETE_ASSIGNMENT_SUCCESS: {
            return Object.assign({}, state, { assignments: state.assignments.filter(assignment => {
                return assignment.id != action.payload.id;
            }) });
        };
        case AssignmentActionTypes.LOAD_ASSIGNMENTS_SUCCESS:            
            return Object.assign({}, state, { hasLoaded: true, assignments: [... action.payload] });
        case AssignmentActionTypes.SET_POSITIONS: {
            const assignments = action.payload.assignments;
            const positions = action.payload.positions;
            return Object.assign({}, state, { 
                hasSetPositions: true, 
                assignments: assignments.map(assignment => {
                    let newPosition: Position = positions.filter(position => position.id == assignment.positionId)[0]
                    return Object.assign({}, assignment, { position: newPosition } ); 
                }) });
        };
        case AssignmentActionTypes.SELECT_ASSIGNMENT:
            return Object.assign({}, state, { selectedAssignment: action.payload } );
        case AssignmentActionTypes.TOGGLE_ASSIGNMENT_SORT:
            return Object.assign({}, state, { sortAsc: !state.sortAsc } );
        case AssignmentActionTypes.SET_HAS_LOADED:
            return Object.assign({}, state, { hasLoaded: [... action.payload] } );
        // always have default return of previous state when action is not relevant
        default:
            return state;
    };
};

// SELECTORS

export const getAssignments = () => state => {
    return state.map(s => s.assignments);
};

export const hasLoaded = () => state =>  {
    return state.map(s => s.hasLoaded);
};

export const hasSetPositions = () => state =>  {
    return state.map(s => s.hasSetPositions);
};

export const getSortAsc = () => state =>  {
    return state.map(s => s.sortAsc);
};

export const getSortedAssignmentsList = () => state => {
    console.log('getSortedAssignmentsList');
    return state.map(([selectedStaff, assignmentState]) => {
        if (assignmentState.hasLoaded && selectedStaff && selectedStaff.person) {
            return assignmentState.assignments
                .filter(assignment => assignment.personId == selectedStaff.person.id)
                .sort((a, b) => {
                    return assignmentState.sortAsc ? 
                    new Date(b.startDate).getTime() - new Date(a.startDate).getTime() :
                    new Date(a.startDate).getTime() - new Date(b.startDate).getTime() 
                    });
        } else {
            return [];
        }
    });
};
