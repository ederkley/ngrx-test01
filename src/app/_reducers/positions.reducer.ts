import { Action } from '@ngrx/store';
import * as _ from 'lodash';

import { Position } from '../_models/person';
import { PositionActionTypes } from '../_actions';

export type PositionsState = Position[];
const initialState: PositionsState = [];

// remember to avoid mutation within reducers
export const positions = (state: PositionsState = initialState, action: Action): PositionsState => {
    switch (action.type) {
        case PositionActionTypes.ADD_POSITION_SUCCESS: 
            return [ ...state, action.payload ];
        case PositionActionTypes.SAVE_POSITION_SUCCESS: {
            let index = _.findIndex(state, {id: action.payload.id});
            if (index >= 0) {
                return [
                    ...state.slice(0, index),
                    action.payload,
                    ...state.slice(index + 1)
                ];
            }
            return state;
        }
        case PositionActionTypes.DELETE_POSITION_SUCCESS: {
            return state.filter(position => {
                return position.id !== action.payload.id;
            });
        }
        case PositionActionTypes.LOAD_POSITIONS_SUCCESS:
            return action.payload;
        // always have default return of previous state when action is not relevant
        default:
            return state;
    };
};
