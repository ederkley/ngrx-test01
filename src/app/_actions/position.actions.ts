import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { type } from '../util';
import { Position } from '../_models/person';

// Position Action Constants
export const PositionActionTypes = {
   GET_POSITION: type('[Position] Get position'),
   GET_POSITION_SUCCESS: type('[Position] Get position success'),
   ADD_POSITION: type('[Position] Add position'),
   ADD_POSITION_SUCCESS: type('[Position] Add position success'),
   SAVE_POSITION: type('[Position] Save position'),
   SAVE_POSITION_SUCCESS: type('[Position] Save position success'),
   DELETE_POSITION: type('[Position] Delete position'),
   DELETE_POSITION_SUCCESS: type('[Position] Delete position success'),
   LOAD_POSITIONS: type('[Position] Load positions'),
   LOAD_POSITIONS_SUCCESS: type('[Position] Load positions success')
};

@Injectable()
export class PositionActions {
    loadPositions(): Action {
        return {
            type: PositionActionTypes.LOAD_POSITIONS
        };
    };

    loadPositionsSuccess(positions: Position[]): Action {
        return {
            type: PositionActionTypes.LOAD_POSITIONS_SUCCESS,
            payload: positions
        };
    };

    getPosition(id: number): Action {
        return {
            type: PositionActionTypes.GET_POSITION,
            payload: id
        };
    }

    getPositionSuccess(position: Position): Action {
        return {
            type: PositionActionTypes.GET_POSITION_SUCCESS,
            payload: position
        };
    }

    savePosition(position: Position): Action {
        return {
            type: PositionActionTypes.SAVE_POSITION,
            payload: position
        };
    }

    savePositionSuccess(position: Position): Action {
        return {
            type: PositionActionTypes.SAVE_POSITION_SUCCESS,
            payload: position
        };
    }

    addPosition(position: Position): Action {
        return {
            type: PositionActionTypes.ADD_POSITION,
            payload: position
        };
    }

    addPositionSuccess(position: Position): Action {
        return {
            type: PositionActionTypes.ADD_POSITION_SUCCESS,
            payload: position
        };
    }

    deletePosition(position: Position): Action {
        return {
            type: PositionActionTypes.DELETE_POSITION,
            payload: position
        };
    }

    deletePositionSuccess(position: Position): Action {
        return {
            type: PositionActionTypes.DELETE_POSITION_SUCCESS,
            payload: position
        };
    }
};
