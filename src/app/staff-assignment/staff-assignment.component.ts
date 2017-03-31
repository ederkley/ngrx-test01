import { Component, OnInit } from '@angular/core';

import {Store} from '@ngrx/store';

import { Position } from '../_models/person';

@Component({
  selector: 'app-staff-assignment',
  templateUrl: './staff-assignment.component.html'
})
export class StaffAssignmentComponent implements OnInit {
public positions: Position[];
public positionId = -99;

  constructor(
      private _store: Store<any>
    ) {
      _store.select('positions')
  }

  ngOnInit() {
  }

}
