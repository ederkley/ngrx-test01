import { Assignment } from '../_models/person';
import { type } from '../util';

// Person Action Constants
export const ActionTypes = {
   ADD_ASSIGNMENT: type('[Assignment] Add assignment'),
   END_ASSIGNMENT: type('[Assignment] End assignment'),
   LOAD_ASSIGNMENTS: type('[Assignment] Load assignments')
 };

// remember to avoid mutation within reducers
export const assignments = (state: Assignment[] = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_ASSIGNMENT:
            return [
                ...state,
                Object.assign({}, { id: action.payload.id, personId: action.payload.personId, positionId: action.payload.positionId,
                    acting: action.payload.acting, startDate: action.payload.startDate})
            ];
        case ActionTypes.END_ASSIGNMENT:
            return state.map(assignment => {
                if (assignment.id === action.payload.id) {
                    return Object.assign({}, assignment, {endDate: action.payload.endDate});
                };
                return assignment;
            });
        case ActionTypes.LOAD_ASSIGNMENTS:
            return action.payload.assignments;
        // always have default return of previous state when action is not relevant
        default:
            return state;
    };
};
