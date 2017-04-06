import '@ngrx/core/add/operator/select';
import {compose} from '@ngrx/core/compose';
import {storeLogger} from 'ngrx-store-logger';
import {combineReducers} from '@ngrx/store';

import * as fromPeople from './people.reducer';
import * as fromPositions from './positions.reducer';
import * as fromAssignments from './assignments.reducer';
import * as fromStaffFilter from './staff-filter.reducer';
import * as fromStaff from './staff.reducer';

export interface AppState {
    people: fromPeople.PeopleState;    
    positions: fromPositions.PositionsState;
    assignments: fromAssignments.AssignmentState;
    peopleFilter: fromStaffFilter.StaffFilterState;
    staff: fromStaff.StaffState;
    selectStaff: fromStaff.SelectStaffState;
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
    peopleFilter: fromStaffFilter.staffFilter,
    staff: fromStaff.staff,
    selectStaff: fromStaff.selectStaff
});
