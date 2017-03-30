import { Person } from '../_models/person';
import { type } from '../util';

// Person Filter Action Constants
export const ActionTypes = {
   SHOW_ALL: type('[PeopleFilter] Show all'),
   SHOW_CURRENT: type('[PeopleFilter] Show current'),
   SHOW_EXECUTIVE: type('[PeopleFilter] Show executive')
 };

 export const peopleFilterSelect = [
     { action: ActionTypes.SHOW_ALL, friendly: 'Show all' },
     { action: ActionTypes.SHOW_CURRENT, friendly: 'Show current' },
     { action: ActionTypes.SHOW_EXECUTIVE, friendly: 'Show executive level' }
 ];

// remember to avoid mutation within reducers
export const peopleFilter = (state = member => member, action) => {
    switch (action.type) {
        case ActionTypes.SHOW_ALL:
            return member => member;
        case ActionTypes.SHOW_CURRENT:
            return member => Object.assign({}, { person: { endDate: true } });
        case ActionTypes.SHOW_EXECUTIVE:
            return member => Object.assign({}, { position: { level: (level) => {
                level === 'EL1' || level === 'EL2' || level === 'SES1' || level === 'SES2'
            } } });
        // always have default return of previous state when action is not relevant
        default:
            return state;
    };
};


// SELECTORS
