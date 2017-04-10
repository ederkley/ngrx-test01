import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { Person, Assignment, Staff } from '../_models/person';
import { StaffActionTypes } from '../_actions';

export type StaffState = {
    staffList: Staff[],
    sortAsc: boolean
};

const initialState: StaffState = {
    staffList: [],
    sortAsc: true
};

export type SelectStaffState = {
    staff: Staff
};
const initialSelectState: SelectStaffState = {
    staff: undefined
};

// remember to avoid mutation within reducers
export const staff = (state: StaffState = initialState, action: Action): StaffState => {
    switch (action.type) {
        case StaffActionTypes.LOAD_STAFF:
            const assignments = action.payload.assignments && action.payload.assignments.assignmentsList;
            const people = action.payload.people && action.payload.people.peopleList;
            if (assignments && assignments.length > 0) {
                return Object.assign({}, state, { staffList: [...people.map(person => {                
                    let thisActualAssignment: Assignment;
                    let thisCurrentAssignment: Assignment;
                    let personsAssignments: Assignment[] = assignments.filter(assignment => assignment.personId == person.id);
                    let actualAssignments: Assignment[] = personsAssignments.filter(assignment => new Date(assignment.startDate) <= new Date && !assignment.acting);
                    let currentAssignments: Assignment[] = personsAssignments.filter(assignment => new Date(assignment.startDate) <= new Date && 
                        (!assignment.endDate || new Date(assignment.endDate) >= new Date ));
                    if (actualAssignments.length > 0) {
                        thisActualAssignment = actualAssignments.reduce((r, a) => r.startDate > a.startDate ? r : a);
                    };
                    if (currentAssignments.length > 0) {
                        thisCurrentAssignment = currentAssignments.reduce((r, a) => r.startDate > a.startDate ? r : a);
                    };
                    return {
                        person: person,
                        currentAssignment: thisCurrentAssignment,
                        actualAssignment: thisActualAssignment
                    };
                })] });
            }; 
            return state;
        case StaffActionTypes.TOGGLE_STAFF_SORT:
            return Object.assign({}, state, { sortAsc: !state.sortAsc });
        // always have default return of previous state when action is not relevant
        default:
            return state;
    };
};


export const selectStaff = (state: SelectStaffState = initialSelectState, action: Action): SelectStaffState => {
    switch (action.type) {
        case StaffActionTypes.SELECT_STAFF:
            return Object.assign({}, state, { staff: Object.assign({}, action.payload) });
        // always have default return of previous state when action is not relevant
        default:
            return state;
    };
};

// SELECTORS

export const getStaffModel = () => {
    console.log('getStaffModel');
    return state => state
        .map(state => {
            return {
                total: state.staffList.length,
                staff: state.staffList
            };
        });
};

export const getStaffList = () => state => {
    console.log('getStaffList');
    return state.map(s => s.staffList);
};

export const getSortAsc = () => state => {
    console.log('getSortAsc');
    return state.map(s => s.sortAsc);
};

export const getSelectStaff = () => state => {
    console.log('getSelectStaff');
    return state.map(s => s.staff);
};
