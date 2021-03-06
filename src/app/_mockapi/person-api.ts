import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Person, Section, Branch, Position, Assignment } from './person';

export class PersonData implements InMemoryDbService {
  createDb() {    

    const people: Person[] = [
        {id: 100, name: 'Frank Smith', commenceDate: new Date('18 Sep 1998Z'), DOB: new Date('3 Aug 1970Z') },
        {id: 101, name: 'Jessica Jones', commenceDate: new Date('18 Sep 2005Z'), DOB: new Date('7 May 1973Z')},
        {id: 102, name: 'Luke Cage', commenceDate: new Date('18 Sep 2008Z'), DOB: new Date('1 Jan 1960Z')},
        {id: 103, name: 'Iron Fist', commenceDate: new Date('18 Oct 1998Z')},
        {id: 104, name: 'Captain America', commenceDate: new Date('18 Sep 2005Z')},
        {id: 105, name: 'Wolverine', commenceDate: new Date('18 Sep 2010Z')},
        {id: 106, name: 'Wanda Maximoff', commenceDate: new Date('18 Sep 1990Z')},
        {id: 107, name: 'Black Panther', commenceDate: new Date('18 Jan 2006Z')},
        {id: 108, name: 'Jackie Smith', commenceDate: new Date('18 Sep 1990Z'), DOB: new Date('1 Jan 1980Z')}
    ];

    const positions: Position[] = [
        {id: 17, title: 'IT System Administrator', level: 'GH06', supervisorId: 29, sectionId: 1, branchId: 1 },
        {id: 18, title: 'IT Helpdesk', level: 'GH04', supervisorId: 29, sectionId: 1, branchId: 1},
        {id: 29, title: 'IT Manager', level: 'EL1', supervisorId: 5, sectionId: 1, branchId: 1},
        {id: 5, title: 'Director, Corporate', level: 'EL2', supervisorId: 2, branchId: 1},
        {id: 2, title: 'Deputy Chief Executive Officer', level: 'SES1', supervisorId: 1, branchId: 3},
        {id: 1, title: 'Chief Executive Officer', level: 'SES2', },
        {id: 30, title: 'Assistant Director, Local Sales', level: 'EL1', supervisorId: 3, sectionId: 2, branchId: 2},
        {id: 3, title: 'Director, Sales', level: 'EL2', supervisorId: 2, branchId: 2}
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
        {id: 108, personId: 100, positionId: 17, startDate: new Date('18 Sep 2000Z',), acting: false },
        {id: 109, personId: 101, positionId: 18, startDate: new Date('18 Sep 2005Z'), acting: false },
        {id: 110, personId: 102, positionId: 29, startDate: new Date('18 Sep 2008Z'), acting: false },
        {id: 111, personId: 103, positionId: 5, startDate: new Date('18 Oct 1998Z'), acting: false },
        {id: 112, personId: 104, positionId: 2, startDate: new Date('18 Sep 2005Z'), acting: false },
        {id: 113, personId: 105, positionId: 1, startDate: new Date('18 Sep 2010Z'), acting: false },
        {id: 114, personId: 106, positionId: 30, startDate: new Date('18 Sep 1990Z'), acting: false },
        {id: 115, personId: 107, positionId: 3, startDate: new Date('18 Sep 2006Z'), endDate: new Date('31 Dec 2016'), acting: false },
        {id: 116, personId: 100, positionId: 29, startDate: new Date('22 Mar 2017Z'), acting: true },
        {id: 117, personId: 100, positionId: 29, startDate: new Date('1 Jun 2016Z'), endDate: new Date('30 Jun 2016Z'), acting: true },
        {id: 118, personId: 102, positionId: 5, startDate: new Date('22 Mar 2017Z'), acting: true }
    ];

    return {people, positions, assignments, branches, sections};
  }
}
