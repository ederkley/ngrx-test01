import '@ngrx/core/add/operator/select';
import {compose} from '@ngrx/core/compose';
import {storeLogger} from 'ngrx-store-logger';
import {combineReducers} from '@ngrx/store';

import * as fromPeople from './people.reducer';
import * as fromPositions from './positions.reducer';
import * as fromAssignments from './assignments.reducer';
import * as fromPeopleFilter from './people-filter.reducer';

export interface AppState {
    people: fromPeople.PeopleState;    
    positions: fromPositions.PositionsState;
    assignments: fromAssignments.AssignmentState;
    peopleFilter: fromPeopleFilter.PeopleFilterState;
};

//uncomment the storeLogger import and this line
//and comment out the other export default line to turn on
//the store logger to see the actions as they flow through the store
//turned this off by default as i found the logger kinda noisy

export default compose(storeLogger(), combineReducers)({
//export default compose(combineReducers)({
    people: fromPeople.people,
    positions: fromPositions.positions,
    assignments: fromAssignments.assignments,
    peopleFilter: fromPeopleFilter.peopleFilter
});
