import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';

import {Store} from '@ngrx/store';

import { Assignment } from '../_models/person';
import { Position } from '../_models/person';

@Component({
  selector: 'app-staff-assignment',
  templateUrl: './staff-assignment.component.html'
})
export class StaffAssignmentComponent implements OnInit {
  public positions;
  public selectedPosition: Position;
  public dateStart: string;
  public dateEnd: string;
  public acting = true;
  public selectedAssignment: Assignment;
  @Input() addingNew = false;
  @Output() updateAssignment: EventEmitter<Assignment> = new EventEmitter<Assignment>();

  @Input() set assignment(assignment: Assignment){
    this.selectedAssignment = Object.assign({}, assignment);
    this.selectedPosition = assignment && assignment.position;
    this.dateStart = assignment && new Date(assignment.startDate).toISOString().substring(0, 10);
    this.dateEnd = assignment && assignment.endDate && new Date(assignment.endDate).toISOString().substring(0, 10);
  };

  constructor(
      private _store: Store<any>
    ) {
      _store.select('positions').subscribe(positions => this.positions = positions);
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (!this.selectedAssignment || this.addingNew) {
      this.selectedAssignment = new Assignment(0, 0, true, new Date);
    }
  }

  setAssignment() {
    this.updateAssignment.emit({
      id: 0,
      personId: 0,
      startDate: this.dateStart && new Date(this.dateStart),
      endDate: this.dateEnd && new Date(this.dateEnd),
      positionId: this.selectedPosition && this.selectedPosition.id,
      acting: this.acting,
      position: this.selectedPosition
    });
  };

};
