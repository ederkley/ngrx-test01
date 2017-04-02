import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { AppState } from '../_reducers';
import { PositionActionTypes, PositionActions } from '../_actions/position-actions';
import { PersonService } from '../_services/person.service';


@Injectable()
export class PositionEffects {
    constructor (
        private update$: Actions,
        private positionActions: PositionActions,
        private svc: PersonService,
    ) {}

    @Effect() loadHeroes$ = this.update$
        .ofType(PositionActionTypes.LOAD_POSITIONS)
        .switchMap(() => this.svc.getPositions())
        .map(positions => this.positionActions.loadPositionsSuccess(positions));


    @Effect() getPosition$ = this.update$
        .ofType(PositionActionTypes.GET_POSITION)
        .map(action => action.payload)
        .switchMap(id => this.svc.getPosition(id))
        .map(position => this.positionActions.getPositionSuccess(position));

    @Effect() savePosition$ = this.update$
        .ofType(PositionActionTypes.SAVE_POSITION)
        .map(action => action.payload)
        .switchMap(position => this.svc.savePosition(position))
        .map(position => this.positionActions.savePositionSuccess(position));

    @Effect() addPosition$ = this.update$
        .ofType(PositionActionTypes.ADD_POSITION)
        .map(action => action.payload)
        .switchMap(position => this.svc.savePosition(position))
        .map(position => this.positionActions.addPositionSuccess(position));

    @Effect() deletePosition$ = this.update$
        .ofType(PositionActionTypes.DELETE_POSITION)
        .map(action => action.payload)
        .switchMap(position => this.svc.deletePosition(position))
        .map(position => this.positionActions.deletePositionSuccess(position));
        
};
