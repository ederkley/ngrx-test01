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
  public positionId = -99;
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
    this.updateAssignment.emit({
      startDate: this.dateStart,
      endDate: this.dateEnd,
      positionId: this.positionId,
      position: this.positions.filter(position => position.id == this.positionId)[0],
      acting: this.acting
    })
  }

}
