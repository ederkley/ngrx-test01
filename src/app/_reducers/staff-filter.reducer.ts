import { Store, Action } from '@ngrx/store';
import { createSelector } from 'reselect'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { type } from '../util';
import { Person, Assignment, Position } from '../_models/person';
import { StaffFilterActionTypes } from '../_actions';

export type StaffFilterState = any;
const initialState: StaffFilterState = null;

export const staffFilterSelect = [
     { action: StaffFilterActionTypes.SHOW_ALL, friendly: 'Show all', order: 5 },
     { action: StaffFilterActionTypes.SHOW_EXSTAFF, friendly: 'Show former staff', order: 4 },
     { action: StaffFilterActionTypes.SHOW_CURRENT, friendly: 'Show current positions', order: 2 },
     { action: StaffFilterActionTypes.SHOW_ACTUAL_POS, friendly: 'Show actual positions', order: 1 },
     { action: StaffFilterActionTypes.SHOW_EXECUTIVE, friendly: 'Show executive level', order: 3 }
];

// remember to avoid mutation within reducers
export const staffFilterState = (state: StaffFilterState = person => undefined, action): StaffFilterState => {
    switch (action.type) {           
        case StaffFilterActionTypes.SHOW_ALL:
            return function (rest?) { 
                return function (person: Person): boolean {
                    return true;
                }
            };
        case StaffFilterActionTypes.SHOW_CURRENT:
        case StaffFilterActionTypes.SHOW_ACTUAL_POS:
            return function (assignments: Assignment[]) { 
                return function (person: Person): boolean {
                    if (!person.currentAssignment) { return false };
                    return !person.currentAssignment.endDate || new Date(person.currentAssignment.endDate) >= new Date();
                } 
            };
        case StaffFilterActionTypes.SHOW_EXSTAFF:   
            return function (assignments: Assignment[]) { 
                return function (person: Person): boolean {
                    if (!person.currentAssignment) { return true };
                    return person.currentAssignment.endDate && new Date(person.currentAssignment.endDate) < new Date();
                }
            };
        case StaffFilterActionTypes.SHOW_EXECUTIVE: 
            return function (assignments: Assignment[]) { 
                return function (person: Person): boolean {
                    if (!person.currentAssignment) { return false };
                    const currentPosition: Position = person.currentAssignment.position;
                    return (currentPosition && (currentPosition.level === 'EL1' || 
                        currentPosition.level === 'EL2' || currentPosition.level === 'SES1' || currentPosition.level === 'SES2'));
                };
            } 
        // always have default return of previous state when action is not relevant
        default:
            return state;
    };
};


// SELECTORS
export const getStaffListSortedView$ = (staffList, staffFilterState, assignmentsView) => {
    console.log('getStaffListSortedView');
    let filter = staffFilterState(assignmentsView);
    staffList = (staffFilterState ? staffList.filter(filter) : []);
    return  { 
        staff: staffList,
        total: staffList.length,
        filter: filter
    };;
};

// returns combined view of person with latest assignment info for current and actual assignments
export const getStaffList$ = (peopleList, assignmentsView) => {
    console.log('getStaffList');
    let staffList = peopleList.map(person => {
        let personsAssignments: Assignment[] = [];
        let currentAssignment: Assignment = undefined;
        let actualAssignment: Assignment = undefined;
        if (assignmentsView.length > 0) {
            personsAssignments = assignmentsView.filter(assignment => assignment.personId == person.id);
        };
        if (personsAssignments.length > 0) {
            currentAssignment = personsAssignments.reduce((a,b) => new Date(a.startDate).getTime() > new Date(b.startDate).getTime() ? a : b);
            let actualAssignments: Assignment[] = personsAssignments.filter(assignment => !assignment.acting);
            if (actualAssignments.length > 0) { 
                actualAssignment = actualAssignments.reduce((a,b) => new Date(a.startDate).getTime() > new Date(b.startDate).getTime() ? a : b);
            };
        };
        return Object.assign(person, {
            assignments: personsAssignments,
            currentAssignment: currentAssignment, 
            actualAssignment: actualAssignment
        });
    });
    return staffList;
};
