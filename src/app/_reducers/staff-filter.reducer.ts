import { Store, Action } from '@ngrx/store';

import { Person, Assignment, Position } from '../_models/person';
import { type } from '../util';
import * as assignmentsReducer from './assignments.reducer';
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
export const staffFilterState = (state: StaffFilterState = person => person, action): StaffFilterState => {
    switch (action.type) {           
        case StaffFilterActionTypes.SHOW_ALL:
            return person => true;
            /*
            return member => member.person && !member.person.exitDate && member.currentAssignment && member.currentAssignment.position && 
                (member.currentAssignment.position.level === 'EL1' || member.currentAssignment.position.level === 'EL2' || 
                member.currentAssignment.position.level === 'SES1' || member.currentAssignment.position.level === 'SES2');
                */
        // always have default return of previous state when action is not relevant
        default:
            return state;
    };
};


// SELECTORS

export const getStaffListView = () => state => state.map(([peopleState, staffFilterState]) => {
    console.log('getStaffListView');
    let peopleList: Person[] = peopleState.people;
    let filter = staffFilterState;
    peopleList = (filter ? peopleList.filter(filter) : peopleList);
    return {
        total: peopleList.length,
        people: peopleList,
        filter: filter
    };
});
