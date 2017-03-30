import { Position } from '../_models/person';
import { type } from '../util';

// Person Action Constants
export const ActionTypes = {
    ADD_POSITION: type('[Position] Add position'),
    REMOVE_POSITION:  type('[Position] Remove position'),
    SET_SUPERVISOR: type('[Position] Set supervisor'),
    SET_SECTION_BRANCH: type('[Position] Set section and branch'),
    SET_BRANCH: type('[Position] Set branch'),
    LOAD_POSITIONS: type('[Position] Load positions')
 };

const details = (state: Position, action) => {
    if (state.id === action.payload) {
        switch (action.type) {
        case ActionTypes.SET_BRANCH :
            return Object.assign({}, state, { branchId: action.payload.branchId });
        case ActionTypes.SET_SECTION_BRANCH :
            return Object.assign({}, state, { sectionId: action.payload.sectionId, branchId: action.payload.branchId });
        case ActionTypes.SET_SUPERVISOR :
            return Object.assign({}, state, { supervisorId: action.payload.personId });
        default:
            return state;
        };
    };
    return state;
};

// remember to avoid mutation within reducers
export const positions = (state: Position[] = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_POSITION:
            return [
                ...state,
                Object.assign({}, { id: action.payload.id, title: action.payload.title })
            ];

        case ActionTypes.REMOVE_POSITION:
            return state.filter(position => position.id !== action.payload);
        case ActionTypes.LOAD_POSITIONS:
            return action.payload.positions;
        // to shorten our case statements, delegate detail updates to second private reducer
        case ActionTypes.SET_BRANCH,
            ActionTypes.SET_SECTION_BRANCH,
            ActionTypes.SET_SUPERVISOR:
            return state.map(position => details(position, action));

        // always have default return of previous state when action is not relevant
        default:
            return state;
    }
};
