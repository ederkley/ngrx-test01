import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';
import { storeLogger } from 'ngrx-store-logger';
import { combineReducers } from '@ngrx/store';
import { createSelector } from 'reselect';

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

// STATE SLICES
export const getPersonState = (state: AppState) => state.peopleState;
export const getAssignmentState = (state: AppState) => state.assignmentState;
export const getPositionState = (state: AppState) => state.positionState;
export const getStaffFilterState = (state: AppState) => state.staffFilterState;

// POSITION REDUCERS
export const getPositionsList$ = createSelector(getPositionState, fromPositions.getPositions$);
export const getPositionsHaveLoaded$ = createSelector(getPositionState, fromPositions.getHasLoaded$);

// PEOPLE REDUCERS
export const getPeopleList$ = createSelector(getPersonState, fromPeople.getPeople$);
export const getPeopleHaveLoaded$ = createSelector(getPersonState, fromPeople.getHasLoaded$);
export const getPersonSelected$ = createSelector(getPersonState, fromPeople.getSelectedPerson$);

// ASSIGNMENT REDUCERS
export const getAssignments$ = createSelector(getAssignmentState, fromAssignments.getAssignments$);
export const getAssignmentsView$ = createSelector(getAssignments$, getPositionsList$, fromAssignments.getAssignmentsView$);
export const getAssignmentsHaveLoaded$ = createSelector(getAssignmentState, fromAssignments.getHasLoaded$);
export const getAssignmentSelected$ = createSelector(getAssignmentState, fromAssignments.getSelectedAssignment$);;
export const getAssignmentSortOrderAsc$ = createSelector(getAssignmentState, fromAssignments.getSortAsc$);
export const getAssignmentSortedView$ = createSelector([getPersonSelected$, getAssignmentsView$, getAssignmentSortOrderAsc$], fromAssignments.getAssignmentsSortedView$);

// STAFF-FILTER REDUCERS
export const getStaffView$ = createSelector([getPeopleList$, getAssignmentsView$], fromStaffFilter.getStaffList$);
export const getStaffSortedView$ = createSelector([getStaffView$, getStaffFilterState, getAssignmentsView$], fromStaffFilter.getStaffListSortedView$);
