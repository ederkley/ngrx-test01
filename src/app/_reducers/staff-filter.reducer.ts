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
            return function (assignments?: Assignment[], rest?) { 
                return function (person: Person): boolean {
                    if (!assignments) { return false; }
                    let personsAssignments = assignments.filter(assignment => assignment.personId == person.id);
                    if (personsAssignments.length > 0) {
                        let currentAssignment = personsAssignments.reduce((a,b) => new Date(a.startDate).getTime() > new Date(b.startDate).getTime() ? a : b);
                        return !currentAssignment.endDate || new Date(currentAssignment.endDate) >= new Date();
                    };
                    return false;
                } 
            };
        case StaffFilterActionTypes.SHOW_EXSTAFF:   
            return function (assignments?: Assignment[], rest?) { 
                return function (person: Person): boolean {
                    if (!assignments) { return false; }
                    let personsAssignments = assignments.filter(assignment => assignment.personId == person.id);
                    if (personsAssignments.length > 0) {
                        let lastAssignment = personsAssignments.reduce((a,b) => new Date(a.startDate).getTime() > new Date(b.startDate).getTime() ? a : b);
                        return lastAssignment.endDate && new Date(lastAssignment.endDate) < new Date();
                    };
                    return true;
                    }
            };
        case StaffFilterActionTypes.SHOW_EXECUTIVE: 
            return function (assignments?: Assignment[], positions?: Position[]) { 
                return function (person: Person): boolean {
                    if (!assignments || !positions) { return false; }
                    let personsAssignments = assignments.filter(assignment => assignment.personId == person.id);
                    if (personsAssignments.length > 0) {
                        let currentAssignment = personsAssignments.reduce((a,b) => new Date(a.startDate).getTime() > new Date(b.startDate).getTime() ? a : b);
                        if (!currentAssignment.endDate || new Date(currentAssignment.endDate) > new Date()) {
                            let currentPositions: Position[] = positions.filter(position => position.id == currentAssignment.positionId);
                            let currentPosition: Position = (currentPositions.length > 0) ? currentPositions[0] : undefined;
                            return (currentPosition && (currentPosition.level === 'EL1' || 
                                currentPosition.level === 'EL2' || currentPosition.level === 'SES1' || currentPosition.level === 'SES2'));
                        };
                    };
                    return false;
                } 
            } 
        // always have default return of previous state when action is not relevant
        default:
            return state;
    };
};


// SELECTORS

const getSelectedPerson = (state: AppState) => state.peopleState.selectedPerson;
const getAssignments = (state) => state.assignmentsState.assignments;
const getPositions = (state) => state.positionsState.positions;

export const getAssignmentsForSelectedPerson = createSelector(
  [ getSelectedPerson, getAssignments ],
  (selectedPerson, assignments) => {
    return assignments.filter(assignment => assignment.personId == selectedPerson.id);
  }
);

export const getCurrentAssignmentForSelectedPerson = createSelector(
  [ getAssignmentsForSelectedPerson ],
  (personsAssignments) => {
    return personsAssignments.length > 0 ? personsAssignments.reduce((a,b) => new Date(a.startDate).getTime() > new Date(b.startDate).getTime() ? a : b) : undefined;
  }
);

export const getActualAssignmentForSelectedPerson = createSelector(
    [ getAssignmentsForSelectedPerson ],
    (personsAssignments) => {
        personsAssignments = personsAssignments.filter(assignment => !assignment.acting);
        return personsAssignments.length > 0 ? personsAssignments.reduce((a,b) => new Date(a.startDate).getTime() > new Date(b.startDate).getTime() ? a : b) : undefined;
  }
);

export const getCurrentPositionForSelectedPerson = createSelector(
    [ getAssignmentsForSelectedPerson ],
    (personsAssignments) => {
        personsAssignments = personsAssignments.filter(assignment => !assignment.acting);
        return personsAssignments.length > 0 ? personsAssignments.reduce((a,b) => new Date(a.startDate).getTime() > new Date(b.startDate).getTime() ? a : b) : undefined;
  }
);

/// returns combined view of person with latest assignment and position info for current and actual assignments
export const getStaffListView$ = () => state => state.map(([peopleState, staffFilterState, assignmentsState, positionsState]) => {
    let peopleList: Person[] = peopleState.people;
    let filter = staffFilterState(assignmentsState.assignments, positionsState.positions);
    peopleList = (staffFilterState ? peopleList.filter(filter) : []);
    let staffList = peopleList.map(person => {
        let personsAssignments = Observable.combineLatest(peopleState, assignmentsState).let(getAssignmentsForSelectedPerson());
        let currentAssignment: Assignment = undefined;
        let actualAssignment: Assignment = undefined;
        let currentPosition: Position = undefined;
        let actualPosition: Position = undefined;
        if (assignmentsState.assignments.length > 0) {
            personsAssignments = assignmentsState.assignments.filter(assignment => assignment.personId == person.id);
        };
        if (personsAssignments.length > 0) {
            currentAssignment = personsAssignments.reduce((a,b) => new Date(a.startDate).getTime() > new Date(b.startDate).getTime() ? a : b);
            let actualAssignments: Assignment[] = personsAssignments.filter(assignment => !assignment.acting);
            if (actualAssignments.length > 0) { 
                actualAssignment = actualAssignments.reduce((a,b) => new Date(a.startDate).getTime() > new Date(b.startDate).getTime() ? a : b);
            };
            if (positionsState.positions.length > 0) {
                if (currentAssignment) { 
                    currentPosition = positionsState.positions.filter(position => position.id == currentAssignment.positionId)[0];
                };
                if (actualAssignment) {
                    actualPosition = positionsState.positions.filter(position => position.id == actualAssignment.positionId)[0];
                }
            };
        };
        return Object.assign(person, {
            assignments: personsAssignments,
            currentAssignment: currentAssignment, 
            actualAssignment: actualAssignment,
            currentPosition: currentPosition,
            actualPosition: actualPosition
        });
    });
    return { 
        staff: staffList,
        total: staffList.length,
        filter: staffFilterState
    };
});
