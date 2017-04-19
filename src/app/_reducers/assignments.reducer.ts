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

export const getSortedAssignmentsView$ = state => {
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

const getAssignmentsForSelectedPerson$ = (state: AssignmentState) => 
  (selectedPerson, assignments) => {
    return assignments.filter(assignment => assignment.personId == selectedPerson.id);
  };

export const getCurrentAssignmentForSelectedPerson$ = (state: AssignmentState) => 
  (personsAssignments) => {
    return personsAssignments.length > 0 ? personsAssignments.reduce((a,b) => new Date(a.startDate).getTime() > new Date(b.startDate).getTime() ? a : b) : undefined;
  }

export const getActualAssignmentForSelectedPerson$ = (state: AssignmentState) => 
    (personsAssignments) => {
        personsAssignments = personsAssignments.filter(assignment => !assignment.acting);
        return personsAssignments.length > 0 ? personsAssignments.reduce((a,b) => new Date(a.startDate).getTime() > new Date(b.startDate).getTime() ? a : b) : undefined;
  }

export const getCurrentPositionForSelectedPerson$ = (state: AssignmentState) => 
    (personsAssignments) => {
        personsAssignments = personsAssignments.filter(assignment => !assignment.acting);
        return personsAssignments.length > 0 ? personsAssignments.reduce((a,b) => new Date(a.startDate).getTime() > new Date(b.startDate).getTime() ? a : b) : undefined;
  }