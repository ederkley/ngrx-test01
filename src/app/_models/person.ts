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
  assignmentIds?: number[];
  assignments?: Assignment[];
  actualAssignment?: Assignment;
  actualPosition?: Position;
  currentAssignment?: Assignment;
  currentPosition?: Position;

  constructor (
    public name: string,
    public commenceDate: Date,
    public assignmentId?: number,
    public DOB?: Date
  ) {
    this.id = 0;
    this.assignmentIds = [];
    if (assignmentId) { this.assignmentIds.push(assignmentId); }
  };
}

export class Assignment {
  id: number;
  position?: Position;
  
  constructor (
    public personId: number,
    public positionId: number,
    public acting: boolean,
    public startDate: Date,
    public endDate?: Date
  ) {
    this.id = 0;
  }
}

export class Branch {
  id: number;
  name: string;
  abbrev: string;
  order: number;
  branchHeadId?: number;
}

export class Section {
  id: number;
  name: string;
  abbrev: string;
  branchId: number;
  order: number;
  sectionHeadId?: number;
}
