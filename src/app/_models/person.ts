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
  currentAssignment?: Assignment;
  actualAssignment?: Assignment;
  
  constructor (
    public name: string,
    public commenceDate: Date,
    public DOB?: Date,
    initialAssignment?: Assignment 
  ) {
    this.id = 0;
    this.currentAssignment = initialAssignment;
    this.actualAssignment = initialAssignment;
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
