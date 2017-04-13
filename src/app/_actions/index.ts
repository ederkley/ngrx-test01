import { PersonActions, PersonActionTypes } from './person.actions';
import { AssignmentActions, AssignmentActionTypes} from './assignment.actions';
import { PositionActions, PositionActionTypes } from './position.actions';
import { StaffFilterActions, StaffFilterActionTypes } from './staff-filter.actions';

export {
    PersonActions, PersonActionTypes,
    AssignmentActions, AssignmentActionTypes,
    PositionActions, PositionActionTypes,
    StaffFilterActions, StaffFilterActionTypes
};

export default [
    PersonActions, PersonActionTypes, 
    AssignmentActions, AssignmentActionTypes,
    PositionActions, PositionActionTypes,
    StaffFilterActions, StaffFilterActionTypes
];

