import { Action } from '@ngrx/store';
import * as _ from 'lodash';

import { Person, Assignment, Staff } from '../_models/person';
import { PersonActionTypes } from '../_actions';

export type PeopleState = Person[];
const initialState: PeopleState = [];

// remember to avoid mutation within reducers
export const people = (state: PeopleState = initialState, action: Action): PeopleState => {
    switch (action.type) {
        case PersonActionTypes.ADD_PERSON_SUCCESS: 
            return [ ...state, action.payload ];
        case PersonActionTypes.SAVE_PERSON_SUCCESS: {
            let index = _.findIndex(state, {id: action.payload.id});
            if (index >= 0) {
                return [
                    ...state.slice(0, index),
                    action.payload,
                    ...state.slice(index + 1)
                ];
            }
            return state;
        }
        case PersonActionTypes.DELETE_PERSON_SUCCESS:{
            return state.filter(person => {
                return person.id !== action.payload.id;
            });
        }
        case PersonActionTypes.LOAD_PEOPLE_SUCCESS:
            return action.payload;
        // always have default return of previous state when action is not relevant
        default:
            return state;
    };
};


// SELECTORS

export const getStaffList = () => {
  return state => state
    .map(([peopleModel, assignmentsModel, positionsModel, peopleFilterModel]) => {
        let staffList: Staff[] = [];
        if (assignmentsModel && assignmentsModel.length > 0) {
            staffList = peopleModel.map(person => {
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
                    person: person,
                    assignments: personsAssignments,
                    currentAssignment: thisCurrentAssignment,
                    actualAssignment: thisActualAssignment
                };
            }).filter(peopleFilterModel);
        }
        return {
            total: staffList.length,
            people: peopleModel,
            staff: staffList,
            filter: peopleFilterModel
        };
      });
};
