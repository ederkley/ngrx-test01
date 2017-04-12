import { Action, combineReducers } from '@ngrx/store';
import * as _ from 'lodash';

import { Assignment } from '../_models/person';
import { AssignmentActionTypes } from '../_actions';

export type AssignmentState = {
    assignments: Assignment[];
    selectedAssignment: Assignment;
    sortAsc: boolean;
    hasLoaded: boolean;
};

const initialState: AssignmentState = {
    assignments: [],
    selectedAssignment: undefined,
    sortAsc: true,
    hasLoaded: false
};

// remember to avoid mutation within reducers; no use of Date.now or Math.random

function assignments(s: Assignment[] = [], action: Action): Assignment[] {
    const state = s;
    switch (action.type) {
        case AssignmentActionTypes.ADD_ASSIGNMENT_SUCCESS: {
            state.push(action.payload); //[...state, action.payload];
            return state;
        };
        case AssignmentActionTypes.SAVE_ASSIGNMENT_SUCCESS: {
            let index = _.findIndex(state, {id: action.payload.id});
            if (index >= 0) {
                return Object.assign({}, state, [
                    ...state.slice(0, index),
                    action.payload,
                    ...state.slice(index + 1)
                ]);
            };
            return state;
        };
        case AssignmentActionTypes.DELETE_ASSIGNMENT_SUCCESS: {
            return state.filter(assignment => {
                return assignment.id != action.payload.id;
            });
        };
        case AssignmentActionTypes.LOAD_ASSIGNMENTS_SUCCESS:            
            return [... action.payload];
        // always have default return of previous state when action is not relevant
        default:
            return state;
    };
};

function selectedAssignment(state: Assignment = undefined, action: Action): Assignment {
    switch (action.type) {
        case AssignmentActionTypes.SELECT_ASSIGNMENT:
            return Object.assign({}, state, { selectedAssignment: action.payload } );
        // always have default return of previous state when action is not relevant
        default:
            return state;
    };
};

function sortAsc(state, action: Action) {
    switch (action.type) {
        case AssignmentActionTypes.TOGGLE_ASSIGNMENT_SORT:
            return Object.assign({}, state, { sortAsc: !state.sortAsc } );
        // always have default return of previous state when action is not relevant
        default:
            return state;
    };
};

function hasLoaded(state, action: Action) {
    switch (action.type) {
        case AssignmentActionTypes.SET_HAS_LOADED:
            return Object.assign({}, state, { hasLoaded: [... action.payload] } );
        // always have default return of previous state when action is not relevant
        default:
            return state;
    };
};

function hasSetPositions(state, action: Action) {
    switch (action.type) {
        case AssignmentActionTypes.SET_HAS_LOADED:
            return Object.assign({}, state, { hasLoaded: [... action.payload] } );
        // always have default return of previous state when action is not relevant
        default:
            return state;
    };
};



export const assignmentState = combineReducers({
    selectedAssignment,
    assignments,
    sortAsc,
    hasLoaded
})

/*(state: AssignmentState = initialState, action: Action): AssignmentState => {
    return {
        hasLoaded: hasLoaded(state.hasLoaded, action),
        assignments: assignments(state.assignments, action),
        selectedAssignment: selectedAssignment(state.selectedAssignment, action),
        sortAsc: sortAsc(state.sortAsc, action),
        hasSetPositions: hasSetPositions(state.hasSetPositions, action)
    }
};*/

// SELECTORS

export const getAssignments = () => state => state.map(s => s.assignments);

export const getHasLoaded = () => state => state.map(s => s.hasLoaded);

export const getSelectedAssignment = () => state => state.map(s => s.selectedAssignment);

export const getSortAsc = () => state => state.map(s => s.sortAsc);

export const getSortedAssignmentsList = () => state => {
    console.log('getSortedAssignmentsList');
    return state.map(([selectedPerson, assignments, sortAsc]) => {
        if (assignments && selectedPerson) {
            return assignments
                .filter(assignment => assignment.personId == selectedPerson.id)
                .sort((a, b) => {
                    return sortAsc ? 
                    new Date(b.startDate).getTime() - new Date(a.startDate).getTime() :
                    new Date(a.startDate).getTime() - new Date(b.startDate).getTime() 
                    });
        } else {
            return [];
        }
    });
};
