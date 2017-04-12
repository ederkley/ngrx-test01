import { Action } from '@ngrx/store';

import { Assignment, Staff } from '../_models/person';
import { StaffActionTypes } from '../_actions';

export type StaffState = {
    staff: Staff[];    
    selectedStaff: Staff;
    sortAsc: boolean;
    hasLoaded: boolean;
};

const initialState: StaffState = {
    staff: [],
    selectedStaff: undefined,
    sortAsc: true,
    hasLoaded: false
};

// remember to avoid mutation within reducers
export const staffState = (state: StaffState = initialState, action: Action): StaffState => {
    switch (action.type) {
        case StaffActionTypes.LOAD_STAFF:
            const assignments = action.payload.assignments;
            const people = action.payload.people;
            if (assignments && assignments.length > 0) {
                return Object.assign({}, state, { hasLoaded: true, staff: [...people.map(person => {                
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
        case StaffActionTypes.SELECT_STAFF:
            return Object.assign({}, state, { selectedStaff: Object.assign({}, action.payload) });
        case StaffActionTypes.TOGGLE_STAFF_SORT:
            return Object.assign({}, state, { sortAsc: !state.sortAsc });
        // always have default return of previous state when action is not relevant
        default:
            return state;
    };
};

// SELECTORS

export const getStaffModel = () => state => {
    return state.map(s => {
        return {
            total: s.staff.length,
            staff: s.staff
        };
    });
};

export const getStaff = () => state => {
    return state.map(s => s.staff);
};

export const getSortAsc = () => state => {
    return state.map(s => s.sortAsc);
};

export const hasLoaded = () => state => {
    return state.map(s => s.hasLoaded);
};

export const getSelectedStaff = () => state => {
    return state.map(s => {
        return s.selectedStaff;
    });
};
