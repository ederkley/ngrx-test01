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

};
