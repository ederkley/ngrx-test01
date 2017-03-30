export const partyModel = () => {
  return state => state
    .map(([people, filter]) => {
      return {
            total: people.length,
            people: people.filter(filter),
            executive: people.filter(person => person.attending).length
          };
    });
};
