import '@ngrx/core/add/operator/select';
import {compose} from '@ngrx/core/compose';
import {storeLogger} from 'ngrx-store-logger';
import {combineReducers} from '@ngrx/store';

import { type } from '../util';
import * as fromPeople from './people.reducer';
import * as fromPositions from './positions.reducer';
import * as fromAssignments from './assignments.reducer';
import * as fromStaffFilter from './staff-filter.reducer';


export interface AppState {
    peopleState: fromPeople.PeopleState;    
    positionState: fromPositions.PositionState;
    assignmentState: fromAssignments.AssignmentState;
    staffFilterState: fromStaffFilter.StaffFilterState;
};

export default compose(storeLogger(),combineReducers)({    
    peopleState: fromPeople.peopleState,
    positionState: fromPositions.positionState,
    assignmentState: fromAssignments.assignmentState,
    staffFilterState: fromStaffFilter.staffFilterState,
});
