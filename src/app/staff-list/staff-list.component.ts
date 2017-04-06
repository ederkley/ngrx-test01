import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { Staff } from '../_models/person';
import * as peopleReducer from '../_reducers/people.reducer';
import * as staffFilterReducer from '../_reducers/staff-filter.reducer';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html'
})
export class StaffListComponent implements OnChanges {
  public showCurrentOnly : boolean;
  @Input() staff: Staff[];
  @Input() filter;
  @Output() selectStaff : EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnChanges() {
    this.showCurrentOnly = (this.filter !== staffFilterReducer.ActionTypes.SHOW_ACTUAL_POS);
  }

}
