import { PersonActions, PersonActionTypes } from './person-actions';
import * as fromAssignmentActions from './assignment-actions';
import { PositionActions, PositionActionTypes } from './position-actions';
import { StaffActions, StaffActionTypes } from './staff-actions';

export default [
    PersonActions, PersonActionTypes, 
    fromAssignmentActions.AssignmentActions, fromAssignmentActions.ActionTypes,
    PositionActions, PositionActionTypes,
    StaffActions, StaffActionTypes
];
