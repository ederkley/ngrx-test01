import { Action } from '@ngrx/store';

import { Person, Assignment, Position } from '../_models/person';
import { StaffFilterActionTypes } from '../_actions';

// remember to avoid mutation within reducers; do not use Date.Now() or Math.Random() etc
export function staffReducer(subReducer) {
    return (state, action) => {
        console.dir(action.type);
        switch(action.type) {            
            case StaffFilterActionTypes.SHOW_CURRENT:
            case StaffFilterActionTypes.SHOW_ACTUAL_POS:
                return Object.assign({}, state, { staffFilterState: function (person): boolean {
                        let assignments: Assignment[] = state.assignmentState.assignments;
                        let personsAssignments = assignments.filter(assignment => assignment.personId == person.id);
                        if (personsAssignments.length > 0) {
                            let currentAssignment = personsAssignments.reduce((a,b) => new Date(a.startDate).getTime() > new Date(b.startDate).getTime() ? a : b);
                            return !currentAssignment.endDate || new Date(currentAssignment.endDate) >= new Date();
                        };
                        return false;
                    } });
            case StaffFilterActionTypes.SHOW_EXSTAFF:   
                return Object.assign({}, state, { staffFilterState: function (person): boolean {
                    let assignments: Assignment[] = state.assignmentState.assignments;
                    let personsAssignments = assignments.filter(assignment => assignment.personId == person.id);
                    if (personsAssignments.length > 0) {
                        let lastAssignment = personsAssignments.reduce((a,b) => new Date(a.startDate).getTime() > new Date(b.startDate).getTime() ? a : b);
                        return lastAssignment.endDate && new Date(lastAssignment.endDate) < new Date();
                    };
                    return true;
                } });
            case StaffFilterActionTypes.SHOW_EXECUTIVE: 
                return Object.assign({}, state, { staffFilterState: function (person): boolean {
                    let assignments: Assignment[] = state.assignmentState.assignments;
                    let positions: Position[] = state.positionState.positions;
                    let personsAssignments = assignments.filter(assignment => assignment.personId == person.id);
                    if (personsAssignments.length > 0) {
                        let currentAssignment = personsAssignments.reduce((a,b) => new Date(a.startDate).getTime() > new Date(b.startDate).getTime() ? a : b);
                        if (!currentAssignment.endDate || new Date(currentAssignment.endDate) > new Date()) {
                            let currentPositions: Position[] = positions.filter(position => position.id == currentAssignment.positionId);
                            let currentPosition: Position = (currentPositions.length > 0) ? currentPositions[0] : undefined;
                            console.log(currentPosition);
                            return (currentPosition && (currentPosition.level === 'EL1' || 
                                currentPosition.level === 'EL2' || currentPosition.level === 'SES1' || currentPosition.level === 'SES2'));
                        };
                    };
                    return false;
                } });
            default:
                return subReducer(state, action);
        }
    }
}

// SELECTORS

export const getHasLoaded = () => state =>  {
    return state.map(s => {
        return !!s.peopleState.hasLoaded && !!s.assignmentState.hasLoaded && !!s.positionState.hasLoaded;
    });
};
