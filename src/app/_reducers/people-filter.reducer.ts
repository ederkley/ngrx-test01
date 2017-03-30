import { Person } from '../_models/person';
import { type } from '../util';

// Person Filter Action Constants
export const ActionTypes = {
   SHOW_ALL: type('[PeopleFilter] Show all'),
   SHOW_CURRENT: type('[PeopleFilter] Show current'),
   SHOW_EXECUTIVE: type('[PeopleFilter] Show executive level')
 };

// remember to avoid mutation within reducers
export const peopleFilter = (state = member => member, action) => {
    switch (action.type) {
        case ActionTypes.SHOW_ALL:
            return member => member;
        case ActionTypes.SHOW_CURRENT:
            return member => !member.person.endDate;
        case ActionTypes.SHOW_EXECUTIVE:
            return member => member.position === 'EL1' || member.position === 'EL2' || member.position === 'SES1' || member.position === 'SES2'
        // always have default return of previous state when action is not relevant
        default:
            return state;
    };
};
