import { Action } from '@ngrx/store';
import * as _ from 'lodash';

import { Person } from '../_models/person';
import { PersonActionTypes } from '../_actions';

export type PeopleState = {
    peopleList: Person[],
    sortAsc: boolean
};

const initialState: PeopleState = {
    peopleList: [],
    sortAsc: true
};

// remember to avoid mutation within reducers
export const people = (state: PeopleState = initialState, action: Action): PeopleState => {
    switch (action.type) {
        case PersonActionTypes.ADD_PERSON_SUCCESS: 
            return Object.assign({}, state, { peopleList: [ ...state.peopleList, action.payload ] });
        case PersonActionTypes.SAVE_PERSON_SUCCESS: {
            let index = _.findIndex(state.peopleList, {id: action.payload.id});
            if (index >= 0) {
                return Object.assign({}, state, { peopleList: [
                    ...state.peopleList.slice(0, index),
                    action.payload,
                    ...state.peopleList.slice(index + 1)
                ]});
            }
            return state;
        }
        case PersonActionTypes.DELETE_PERSON_SUCCESS:{
            return Object.assign({}, state, { peopleList: state.peopleList.filter(person => {
                return person.id != action.payload.id;
            }) });
        }
        case PersonActionTypes.LOAD_PEOPLE_SUCCESS:
            return Object.assign({}, state, { peopleList: action.payload });
        // always have default return of previous state when action is not relevant
        default:
            return state;
    };
};

export const getPeopleList = () => state => {
    console.log('getPeopleList');
    return state.map(s => s.peopleList);
};

export const getSortAsc = () => state =>  {
    console.log('getSortAsc');
    return state.map(s => s.sortAsc);
};

export const getSortedPeopleList = () => state => {
    console.log('getSortedPeopleList');
    return state.map(people => {
        return people.peopleList
            .sort((a, b) => {
                return people.sortAsc ? 
                (b.name < a.name ? -1 : 1) :
                (a.name < b.name ? -1 : 1)
                });
        });
};
