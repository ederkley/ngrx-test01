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
    .map(([peopleModel, assignmentsModel, positionsModel]) => {
        let staff = [];
        if (assignmentsModel && assignmentsModel.length > 0) {
            staff = peopleModel.map(person => {
                const personsAssignments: Assignment[] = assignmentsModel.filter(assignment => assignment.personId === person.id);
                let thisAssignment: Assignment;
                let thisPosition: Position;
                if (personsAssignments.length > 0) {
                    thisAssignment = personsAssignments.reduce((r, a) => r.startDate > a.startDate ? r : a);
                    thisPosition = positionsModel.filter(position => position.id === thisAssignment.positionId)[0];
                }
                return {
                    person: person,
                    assignment: thisAssignment,
                    position: thisPosition
                };
            });
        }
        return {
            total: peopleModel.length,
            people: peopleModel,
            staff: staff
        };
      });
};
