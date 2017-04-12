import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { Person } from '../_models/person';
import { PersonActionTypes } from '../_actions';

export type PeopleState = {
    people: Person[];
    selectedPerson: Person;
    hasLoaded: boolean;
};

const initialState: PeopleState = {
    people: [],
    selectedPerson: undefined,
    hasLoaded: false
};

// remember to avoid mutation within reducers
export const peopleState = (state: PeopleState = initialState, action: Action): PeopleState => {
    switch (action.type) {
        case PersonActionTypes.ADD_PERSON_SUCCESS: 
            return Object.assign({}, state, { people: [ ...state.people, action.payload ] });
        case PersonActionTypes.SAVE_PERSON_SUCCESS: {
            let index = _.findIndex(state.people, {id: action.payload.id});
            if (index >= 0) {
                return Object.assign({}, state, { people: [
                    ...state.people.slice(0, index),
                    action.payload,
                    ...state.people.slice(index + 1)
                ]});
            };
            return state;
        };
        case PersonActionTypes.DELETE_PERSON_SUCCESS: {
            return Object.assign({}, state, { people: state.people.filter(person => {
                return person.id != action.payload.id;
            }) });
        };
        case PersonActionTypes.LOAD_PEOPLE_SUCCESS:
            return Object.assign({}, state, { hasLoaded: true, people: [... action.payload] });
        // always have default return of previous state when action is not relevant
        default:
            return state;
    };
};

// SELECTORS

export const getPeople = () => state => {
    return state.map(s => s.people);
};

export const getHasLoaded = () => state =>  {
    return state.map(s => s.hasLoaded);
};

export const getSelectedPerson = () => state =>  {
    return state.map(s => s.selectedPerson);
};
