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


export const getStaffListView = () => {
  return state => state
    .map(([staffModel, peopleFilterModel]) => {
        let staffList: Staff[] = [];
        if (staffModel.staff) {
            staffList = staffModel.staff.filter(peopleFilterModel);
        };
        let response = {
            total: staffList.length,
            staff: staffList,
            filter: peopleFilterModel
        };
        console.dir(response);
        return response;
      });
};
