export class Position {
  id: number;
  title: string;
  level: string;
  sectionId?: number;
  branchId?: number;
  notes?: string;
  supervisorId?: number;
}

export class Person {
  id: number;
  name: string;
  commenceDate: Date;
  exitDate?: Date;
}

export class Assignment {
  id: number;
  constructor (
    public personId: number,
    public positionId: number,
    public acting: boolean,
    public startDate: Date,
    public endDate?: Date,
    public position?: Position
  ) {
    this.id = 0;
  }
}

export class Staff {
  id: number;
  person: Person;
  assignments: Assignment[] = [];
  currentAssignment: Assignment;
  actualAssignment: Assignment;
}

export class Branch {
  id: number;
  name: string;
  abbrev: string;
  branchHeadId?: number;
}

export class Section {
  id: number;
  name: string;
  abbrev: string;
  branchId: number;
  sectionHeadId?: number;
}
