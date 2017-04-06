import { Component, Output, EventEmitter, OnInit } from '@angular/core';

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
  @Output() updateAssignment: EventEmitter<any> = new EventEmitter<any>();

  constructor(
      private _store: Store<any>
    ) {
      _store.select('positions').subscribe(positions => {
        console.dir(positions);
        this.positions = positions
      });
  }

  ngOnInit() {
  }

  setAssignment() {
    console.log(this.selectedPosition);
    this.updateAssignment.emit({
      startDate: this.dateStart,
      endDate: this.dateEnd,
      positionId: this.selectedPosition && this.selectedPosition.id,
      acting: this.acting,
      position: this.selectedPosition
    })
  }

}
