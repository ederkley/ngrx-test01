import { Action } from '@ngrx/store';
import * as _ from 'lodash';

import { Person, Assignment, Staff } from '../_models/person';
import { StaffActionTypes } from '../_actions';

export type StaffState = Staff[];
const initialState: StaffState = [];

// remember to avoid mutation within reducers
export const staff = (state: StaffState = initialState, action: Action): StaffState => {
    switch (action.type) {
        case StaffActionTypes.ADD_STAFF: 
            return [ ...state, action.payload ];
        case StaffActionTypes.SAVE_STAFF: {
            let index = _.findIndex(state, { id: action.payload.id });
            if (index >= 0) {
                return [
                    ...state.slice(0, index),
                    action.payload,
                    ...state.slice(index + 1)
                ];
            }
            return state;
        }
        case StaffActionTypes.DELETE_STAFF:{
            return state.filter(staff => {
                return staff.person && staff.person.id !== action.payload.person.id;
            });
        }
        case StaffActionTypes.LOAD_STAFF:
            return action.payload;
        // always have default return of previous state when action is not relevant
        default:
            return state;
    };
};

// SELECTORS

export const getStaffModel = () => {
  return state => state
    .map(([peopleModel, assignmentsModel, positionsModel]) => {
        let staffList: Staff[] = [];
        staffList = peopleModel.map(person => {
            if (assignmentsModel && assignmentsModel.length > 0) {
                let personsAssignments: Assignment[] = assignmentsModel.filter(assignment => assignment.personId === person.id);
                personsAssignments.map(assignment => assignment.position = positionsModel.filter(position => position.id === assignment.positionId)[0]);
                let thisActualAssignment: Assignment;
                let thisCurrentAssignment: Assignment;
                if (personsAssignments.length > 0) {
                    thisCurrentAssignment = personsAssignments.reduce((r, a) => r.startDate > a.startDate ? r : a);
                    thisCurrentAssignment.position = positionsModel.filter(position => position.id === thisCurrentAssignment.positionId)[0];
                    thisActualAssignment = personsAssignments.filter(assignment => !assignment.acting).reduce((r, a) => r.startDate > a.startDate ? r : a);
                    thisActualAssignment.position = positionsModel.filter(position => position.id === thisActualAssignment.positionId)[0];
                }
                return {
                    id: person.id,
                    person: person,
                    assignments: personsAssignments,
                    currentAssignment: thisCurrentAssignment,
                    actualAssignment: thisActualAssignment
                };
            };
            return { 
                id: person.id,
                person: person,
                assignments: []
            };
        });
        return {
            total: staffList.length,
            staff: staffList
        };
      });
};
