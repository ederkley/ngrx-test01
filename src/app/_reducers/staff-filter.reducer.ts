import { Store, Action } from '@ngrx/store';
import { Person, Assignment, Position } from '../_models/person';
import { type } from '../util';
import * as assignmentsReducer from './assignments.reducer';

export type StaffFilterState = any;
const initialState: StaffFilterState = null;

// Person Filter Action Constants
export const ActionTypes = {
   SHOW_ALL: type('[StaffFilter] Show all'),
   SHOW_EXSTAFF: type('[StaffFilter] Show former staff'),
   SHOW_CURRENT: type('[StaffFilter] Show current positions'),
   SHOW_ACTUAL_POS: type('[StaffFilter] Show actual positions'),
   SHOW_EXECUTIVE: type('[StaffFilter] Show executive')
 };

 export const staffFilterSelect = [
     { action: ActionTypes.SHOW_ALL, friendly: 'Show all', order: 5 },
     { action: ActionTypes.SHOW_EXSTAFF, friendly: 'Show former staff', order: 4 },
     { action: ActionTypes.SHOW_CURRENT, friendly: 'Show current positions', order: 2 },
     { action: ActionTypes.SHOW_ACTUAL_POS, friendly: 'Show actual positions', order: 1 },
     { action: ActionTypes.SHOW_EXECUTIVE, friendly: 'Show executive level', order: 3 }
 ];

// remember to avoid mutation within reducers
export const staffFilterState = (state: StaffFilterState = person => person, action): StaffFilterState => {
    console.dir(action.type);
    //const assignments = action.payload.assignments;
    //const positions = action.payload.positions;
    switch (action.type) {
        case ActionTypes.SHOW_CURRENT:
        /*
            return ([person, assignments, positions]) => {
                console.dir([...params]);
                console.dir(assignments);
                console.dir(positions);
                    return assignments.filter(assignment => assignment.personId == person.id)
                    .reduce((a,b) => new Date(a.startDate).getTime() > new Date(b.startDate).getTime()).length > 0;
                
            };
         */   
        case ActionTypes.SHOW_ALL:
            return person => person;
        case ActionTypes.SHOW_EXSTAFF:
        case ActionTypes.SHOW_ACTUAL_POS:
        case ActionTypes.SHOW_EXECUTIVE:
            return state;
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

export const getStaffListView = () => state => state.map(([people, assignments, positions, staffFilter]) => {
    let peopleList: Person[] = [];
    if (assignments && positions && people) {
        console.dir(staffFilter);
        peopleList = (staffFilter ? people.filter(staffFilter) : people);
    };
    return {
        total: peopleList.length,
        people: peopleList,
        filter: staffFilter
    };
});

