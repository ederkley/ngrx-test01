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

  @Input('assignment') set assignment(assignment: Assignment){
    if (assignment) {
      Object.assign({}, this.selectedAssignment, assignment);
    };
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
    console.log(this.selectedPosition);
    this.updateAssignment.emit({
      id: 0,
      personId: 0,
      startDate: new Date(this.dateStart),
      endDate: new Date(this.dateEnd),
      positionId: this.selectedPosition && this.selectedPosition.id,
      acting: this.acting,
      position: this.selectedPosition
    });
  };

};
