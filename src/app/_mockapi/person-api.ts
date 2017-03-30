import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Person, Section, Branch, Position, Assignment } from '../_models/person';

export class PersonData implements InMemoryDbService {
  createDb() {
    const people: Person[] = [
        {id: 100, name: 'Frank Smith', commenceDate: new Date('18 Sep 1998') },
        {id: 101, name: 'Jessica Jones', commenceDate: new Date('18 Sep 2005')},
        {id: 102, name: 'Luke Cage', commenceDate: new Date('18 Sep 2008')},
        {id: 103, name: 'Iron Fist', commenceDate: new Date('18 Oct 1998')},
        {id: 104, name: 'Captain America', commenceDate: new Date('18 Sep 2005')},
        {id: 105, name: 'Wolverine', commenceDate: new Date('18 Sep 2010')},
        {id: 106, name: 'Wanda Maximoff', commenceDate: new Date('18 Sep 1990')},
        {id: 107, name: 'Black Panther', commenceDate: new Date('18 Jan 2006')},
        {id: 108, name: 'Jackie Smith', commenceDate: new Date('18 Sep 1990'), exitDate: new Date('1 Jan 2006')}
    ];

    const positions: Position[] = [
        {id: 17, title: 'IT System Administrator', supervisorId: 29, sectionId: 1, branchId: 1 },
        {id: 18, title: 'IT Helpdesk', supervisorId: 29, sectionId: 1, branchId: 1},
        {id: 29, title: 'IT Manager', supervisorId: 5, sectionId: 1, branchId: 1},
        {id: 5, title: 'Director, Corporate', supervisorId: 2, branchId: 1},
        {id: 2, title: 'Deputy Chief Executive Officer', supervisorId: 1, branchId: 3},
        {id: 1, title: 'Chief Executive Officer'},
        {id: 30, title: 'Assistant Director, Local Sales', supervisorId: 3, sectionId: 2, branchId: 2},
        {id: 3, title: 'Director, Sales', supervisorId: 2, branchId: 2}
    ];

    const branches: Branch[] = [
        {id: 1, name: 'Corporate', abbrev: 'Corp', branchHeadId: 5},
        {id: 2, name: 'Sales', abbrev: 'Sales', branchHeadId: 3},
        {id: 3, name: 'Deputy Chief Executive Officer', abbrev: 'Deputy CEO', branchHeadId: 2}
    ];

    const sections: Section[] = [
        {id: 1, name: 'Information Technology', abbrev: 'IT', branchId: 1, sectionHeadId: 29},
        {id: 2, name: 'Local Sales', abbrev: 'Local Sales', branchId: 2, sectionHeadId: 3}
    ];

    const assignments: Assignment[] = [
        {id: 108, personId: 100, positionId: 17, startDate: new Date('18 Sep 2000'), acting: false },
        {id: 109, personId: 101, positionId: 18, startDate: new Date('18 Sep 2005'), acting: false },
        {id: 110, personId: 102, positionId: 29, startDate: new Date('18 Sep 2008'), acting: false },
        {id: 111, personId: 103, positionId: 5, startDate: new Date('18 Oct 1998'), acting: false },
        {id: 112, personId: 104, positionId: 2, startDate: new Date('18 Sep 2005'), acting: false },
        {id: 113, personId: 105, positionId: 1, startDate: new Date('18 Sep 2010'), acting: false },
        {id: 114, personId: 106, positionId: 30, startDate: new Date('18 Sep 1990'), acting: false },
        {id: 115, personId: 107, positionId: 3, startDate: new Date('18 Sep 2006'), acting: false },
        {id: 108, personId: 100, positionId: 29, startDate: new Date('22 Mar 2017'), acting: true },
        {id: 109, personId: 101, positionId: 5, startDate: new Date('22 Mar 2017'), acting: true }
    ];

    const executives: number[] = [
        5, 2, 1, 3
    ];

    return {people, positions, assignments, branches, sections, executives};
  }
}
