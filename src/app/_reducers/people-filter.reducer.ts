import { Person } from '../_models/person';
import { type } from '../util';

// Person Filter Action Constants
export const ActionTypes = {
   SHOW_ALL: type('[PeopleFilter] Show all'),
   SHOW_EXSTAFF: type('[PeopleFilter] Show former staff'),
   SHOW_CURRENT: type('[PeopleFilter] Show current positions'),
   SHOW_ACTUAL_POS: type('[PeopleFilter] Show actual positions'),
   SHOW_EXECUTIVE: type('[PeopleFilter] Show executive')
 };

 export const peopleFilterSelect = [
     { action: ActionTypes.SHOW_ALL, friendly: 'Show all', order: 5 },
     { action: ActionTypes.SHOW_EXSTAFF, friendly: 'Show former staff', order: 4 },
     { action: ActionTypes.SHOW_CURRENT, friendly: 'Show current positions', order: 2 },
     { action: ActionTypes.SHOW_ACTUAL_POS, friendly: 'Show actual positions', order: 1 },
     { action: ActionTypes.SHOW_EXECUTIVE, friendly: 'Show executive level', order: 3 }
 ];

// remember to avoid mutation within reducers
export const peopleFilter = (state = member => member, action) => {
    switch (action.type) {
        case ActionTypes.SHOW_ALL:
            return member => member.person;
        case ActionTypes.SHOW_EXSTAFF:
            return member => member.person && member.person.exitDate;
        case ActionTypes.SHOW_CURRENT:
        case ActionTypes.SHOW_ACTUAL_POS:
            return member => member.person && !member.person.exitDate;
        case ActionTypes.SHOW_EXECUTIVE:
            return member => member.person && !member.person.exitDate && member.currentAssignment && member.currentAssignment.position && 
                (member.currentAssignment.position.level === 'EL1' || member.currentAssignment.position.level === 'EL2' || 
                member.currentAssignment.position.level === 'SES1' || member.currentAssignment.position.level === 'SES2');
        // always have default return of previous state when action is not relevant
        default:
            return state;
    };
};


// SELECTORS
