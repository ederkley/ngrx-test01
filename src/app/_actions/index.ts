import { PersonActions, PersonActionTypes } from './person-actions';
import { AssignmentActions, AssignmentActionTypes } from './assignment-actions';
import { PositionActions, PositionActionTypes } from './position-actions';
import { StaffActions, StaffActionTypes } from './staff-actions';

export {
    PersonActions, PersonActionTypes,
    AssignmentActions, AssignmentActionTypes,
    PositionActions, PositionActionTypes,
    StaffActions, StaffActionTypes
};

export default [
    PersonActions, PersonActionTypes, 
    AssignmentActions, AssignmentActionTypes,
    PositionActions, PositionActionTypes,
    StaffActions, StaffActionTypes
];
