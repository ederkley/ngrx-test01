import { Action, combineReducers } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
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

// remember to avoid mutation within reducers
export const assignmentState = (state: AssignmentState = initialState, action: Action): AssignmentState => {
    switch (action.type) {
        case AssignmentActionTypes.ADD_ASSIGNMENT_SUCCESS: 
            return {...state, ...{ assignments: [ ...state.assignments, action.payload ] } };
        case AssignmentActionTypes.SAVE_ASSIGNMENT_SUCCESS: {
            let index = _.findIndex(state.assignments, {id: action.payload.id});
            if (index >= 0) {
                return Object.assign({}, state, { assignments: [
                    ...state.assignments.slice(0, index),
                    action.payload,
                    ...state.assignments.slice(index + 1)
                ]});
            };
            return state;
        };
        case AssignmentActionTypes.DELETE_ASSIGNMENT_SUCCESS: {
            return Object.assign({}, state, { assignments: state.assignments.filter(person => {
                return person.id != action.payload.id;
            }) });
        };
        case AssignmentActionTypes.LOAD_ASSIGNMENTS_SUCCESS:
            return Object.assign({}, state, { hasLoaded: true, assignments: [... action.payload] });
        case AssignmentActionTypes.TOGGLE_ASSIGNMENT_SORT:
            return Object.assign({}, state, { sortAsc: !state.sortAsc });
        case AssignmentActionTypes.SELECT_ASSIGNMENT:
            return Object.assign({}, state, { selectedAssignment: action.payload });
        // always have default return of previous state when action is not relevant
        default:
            return state;
    };
};

// SELECTORS
export const getAssignments$ = (state: AssignmentState) => state.assignments;

export const getHasLoaded$ = (state: AssignmentState) => state.hasLoaded;

export const getSelectedAssignment$ = (state: AssignmentState) => state.selectedAssignment;

export const getSortAsc$ = (state: AssignmentState) => state.sortAsc;

export const getSortedAssignmentsView$ = (selectedPerson, assignments, positions, sortAsc) => {
    console.log('getSortedAssignmentsList');
    if (assignments && positions && selectedPerson) {
        let personsAssignments: Assignment[] = assignments.filter(assignment => assignment.personId == selectedPerson.id);
        if (personsAssignments.length > 0) {
            return personsAssignments
                .map(assignment => {
                    const assignmentPositions: Position[] = positions.filter(position => position.id == assignment.positionId);
                    if (assignmentPositions.length === 1) {
                        return Object.assign(assignment, { position: assignmentPositions[0] });
                    } else {
                        return assignment;
                    };
                })
                .sort((a, b) => {
                    return sortAsc ? 
                    new Date(b.startDate).getTime() - new Date(a.startDate).getTime() :
                    new Date(a.startDate).getTime() - new Date(b.startDate).getTime() 
                });
        };
    } else {
        return [];
    };
};
