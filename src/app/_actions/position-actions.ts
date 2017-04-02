import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { type } from '../util';

// Position Action Constants
export const PositionActionTypes = {
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

    loadPositionsSuccess(positions): Action {
        return {
            type: PositionActionTypes.LOAD_POSITIONS_SUCCESS,
            payload: positions
        };
    };
};
