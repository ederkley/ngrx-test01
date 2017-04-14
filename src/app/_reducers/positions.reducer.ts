import { Action } from '@ngrx/store';
import * as _ from 'lodash';

import { Position } from '../_models/person';
import { PositionActionTypes } from '../_actions';

export type PositionState = {
    positions: Position[];
    selectedPosition: Position;
    hasLoaded: boolean;
};

const initialState: PositionState = {
    positions: [],
    selectedPosition: undefined,
    hasLoaded: false
};

// remember to avoid mutation within reducers
export const positionState = (state: PositionState = initialState, action: Action): PositionState => {
    switch (action.type) {
        case PositionActionTypes.ADD_POSITION_SUCCESS: 
            return Object.assign({}, state, { positions: [ ...state.positions, action.payload ] });
        case PositionActionTypes.SAVE_POSITION_SUCCESS: {
            let index = _.findIndex(state.positions, {id: action.payload.id});
            if (index >= 0) {
                return Object.assign({}, state, { positions: [
                    ...state.positions.slice(0, index),
                    action.payload,
                    ...state.positions.slice(index + 1)
                ] });
            }
            return state;
        }
        case PositionActionTypes.DELETE_POSITION_SUCCESS: {
            return Object.assign({}, state, { positions: state.positions.filter(position => {
                return position.id !== action.payload.id;
            }) });
        }
        case PositionActionTypes.LOAD_POSITIONS_SUCCESS:
            return Object.assign({}, state, { hasLoaded: true, positions: [... action.payload] });
        // always have default return of previous state when action is not relevant
        default:
            return state;
    };
};

// SELECTORS

export const getPositions$ = () => state => state.map(s => s.positions);

export const getHasLoaded$ = () => state => state.map(s => s.hasLoaded);

export const getPosition$ = (state: PositionState, positionId: number) => {
    return state.positions.filter(position => position.id == positionId)[0];
};
