import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { Staff } from '../_models/person';
import * as peopleReducer from '../_reducers/people.reducer';
import * as peopleFilterReducer from '../_reducers/people-filter.reducer';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html'
})
export class StaffListComponent implements OnChanges {
  public showCurrentOnly : boolean;
  @Input() staff: Staff[];
  @Input() filter;
  @Output() selectPerson : EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnChanges() {
    this.showCurrentOnly = (this.filter !== peopleFilterReducer.ActionTypes.SHOW_ACTUAL_POS);
  }

}
