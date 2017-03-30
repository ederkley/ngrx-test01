let start = Math.floor(Math.random() * (5000)) + 1000;
// fake id starting at random number
export const newId = () => {
  return ++start;
};

export interface Position {
  id: number;
  title: string;
  level: string;
  sectionId?: number;
  branchId?: number;
  notes?: string;
  supervisorId?: number;
}

export interface Person {
  id: number;
  name: string;
  commenceDate: Date;
  exitDate?: Date;
}

export interface Assignment {
  id: number;
  personId: number;
  positionId: number;
  acting: boolean;
  startDate: Date;
  endDate?: Date;
}

export interface Branch {
  id: number;
  name: string;
  abbrev: string;
  branchHeadId?: number;
}

export interface Section {
  id: number;
  name: string;
  abbrev: string;
  branchId: number;
  sectionHeadId?: number;
}
