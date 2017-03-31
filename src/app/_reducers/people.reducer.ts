import { Person, Assignment } from '../_models/person';
import { type } from '../util';

// Person Action Constants
export const ActionTypes = {
   ADD_PERSON: type('[Person] Add person'),
   REMOVE_PERSON: type('[Person] Remove person'),
   LOAD_PEOPLE: type('[Person] Load people')
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

// SELECTORS

export const getStaff = () => {
  return state => state
    .map(([peopleModel, assignmentsModel, positionsModel, peopleFilterModel]) => {
        let staff = [];
        if (assignmentsModel && assignmentsModel.length > 0) {
            staff = peopleModel.map(person => {
                const personsAssignments: Assignment[] = assignmentsModel.filter(assignment => assignment.personId === person.id);
                let thisActualAssignment: Assignment;
                let thisCurrentAssignment: Assignment;
                let thisActualPosition: Position;
                let thisCurrentPosition: Position;
                if (personsAssignments.length > 0) {
                    thisCurrentAssignment = personsAssignments.reduce((r, a) => r.startDate > a.startDate ? r : a);
                    thisCurrentPosition = positionsModel.filter(position => position.id === thisCurrentAssignment.positionId)[0];
                    thisActualAssignment = personsAssignments.filter(assignment => !assignment.acting).reduce((r, a) => r.startDate > a.startDate ? r : a);
                    thisActualPosition = positionsModel.filter(position => position.id === thisActualAssignment.positionId)[0];
                }
                return {
                    person: person,
                    currentAssignment: thisCurrentAssignment,
                    currentPosition: thisCurrentPosition,
                    actualAssignment: thisActualAssignment,
                    actualPosition: thisActualPosition
                };
            }).filter(peopleFilterModel);
        }
        return {
            total: staff.length,
            people: peopleModel,
            staff: staff,
            filter: peopleFilterModel
        };
      });
};
