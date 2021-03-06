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
  DOB?: Date;
}

export class Assignment {
  id: number;
  constructor (
    public personId: number,
    public positionId: number,
    public acting: boolean,
    public startDate: Date
  ) {
  }
  endDate?: Date;
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
