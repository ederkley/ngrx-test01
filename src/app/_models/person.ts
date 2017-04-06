export class Position {
  id: number;
  title: string;
  level: string;
  sectionId?: number;
  section?: Section;
  branchId?: number;
  branch?: Branch;
  notes?: string;
  supervisorId?: number;
  supervisor: Staff;
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
  person: Person;
  assignments: Assignment[] = [];
  currentAssignment: Assignment;
  actualAssignment: Assignment;
}

export class Branch {
  id: number;
  name: string;
  abbrev: string;
  order: number;
  branchHeadId?: number;
  branchHead?: Staff;
}

export class Section {
  id: number;
  name: string;
  abbrev: string;
  branchId: number;
  branch?: Branch;
  order: number;
  sectionHeadId?: number;
  sectionHead?: Staff;
}
