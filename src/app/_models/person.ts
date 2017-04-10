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
  constructor (
    public name: string,
    public commenceDate: Date,
    public exitDate?: Date
  ) {
    this.id = 0;
  };
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
  currentAssignment: Assignment;
  actualAssignment: Assignment;
  constructor(
    public person: Person,
    public assignment: Assignment 
  ) {
    this.currentAssignment = assignment;
    this.actualAssignment = assignment;
  }
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
