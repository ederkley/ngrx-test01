import { Action } from '@ngrx/store';
import * as _ from 'lodash';

import { Person, Assignment, Staff } from '../_models/person';
import { StaffActionTypes } from '../_actions';

export type StaffState = Staff[];
const initialState: StaffState = [];

export type SelectStaffState = Staff;
const initialSelectState: SelectStaffState = undefined;

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
                return staff.person && staff.person.id != action.payload.person.id;
            });
        }
        case StaffActionTypes.LOAD_STAFF:
            const assignments = action.payload.assignments;
            const people = action.payload.people;
            
            return [...people.map(person => {
                if (assignments && assignments.length > 0) {
                    let thisActualAssignment: Assignment;
                    let thisCurrentAssignment: Assignment;
                    let personsAssignments: Assignment[] = assignments.filter(assignment => assignment.personId == person.id);
                    let actualAssignments: Assignment[] = personsAssignments.filter(assignment => new Date(assignment.startDate) <= new Date && !assignment.acting);
                    let currentAssignments: Assignment[] = personsAssignments.filter(assignment => new Date(assignment.startDate) <= new Date && 
                        (!assignment.endDate || new Date(assignment.endDate) >= new Date ));
                    if (actualAssignments.length > 0) {
                        thisActualAssignment = actualAssignments.reduce((r, a) => r.startDate > a.startDate ? r : a);
                    };
                    if (currentAssignments.length > 0) {
                        thisCurrentAssignment = currentAssignments.reduce((r, a) => r.startDate > a.startDate ? r : a);
                    };

                    return Object.assign({}, {
                        id: person.id,
                        person: person,
                        assignments: personsAssignments,
                        currentAssignment: thisCurrentAssignment,
                        actualAssignment: thisActualAssignment
                    });
                };
                return {
                    id: person.id,
                    person: person,
                    assignments: []
                };
            })];
        // always have default return of previous state when action is not relevant
        default:
            return state;
    };
};


export const selectStaff = (state: SelectStaffState = initialSelectState, action: Action): SelectStaffState => {
    switch (action.type) {
        case StaffActionTypes.SELECT_STAFF:
            return action.payload;        
        // always have default return of previous state when action is not relevant
        default:
            return state;
    };
};

// SELECTORS

export const getStaffModel = () => {
    console.log('getStaffModel');
    return state => state
        .map(staffModel => {
            return {
                total: staffModel.length,
                staff: staffModel
            };
        });
};
