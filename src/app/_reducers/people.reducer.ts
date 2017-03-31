import { Person, Assignment, Staff } from '../_models/person';
import { type } from '../util';

// Person Action Constants
export const ActionTypes = {
   ADD_PERSON: type('[Person] Add person'),
   REMOVE_PERSON: type('[Person] Remove person'),
   LOAD_PEOPLE: type('[Person] Load people'),
   SELECT_PERSON: type('[selectedPerson] Select person')
 };

// remember to avoid mutation within reducers
export const people = (state: Person[] = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_PERSON :
            return [...state, Object.assign({}, {
                id: action.payload.id, name: action.payload.name, commenceDate: action.payload.commenceDate
            })];
        case ActionTypes.REMOVE_PERSON :
            return state.filter(person => person.id !== action.payload);
        case ActionTypes.LOAD_PEOPLE :
            return action.payload.people;
        default:
            return state;
    }
};

export const selectedPerson = (state : Person, action) => {
    switch (action.type) {
        case ActionTypes.SELECT_PERSON :
            return Object.assign({}, state, action.payload)
        default:
            return state;
    }
}

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
