import { Component, Input, OnChanges } from '@angular/core';

import * as peopleReducer from '../_reducers/people.reducer';
import * as peopleFilterReducer from '../_reducers/people-filter.reducer';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styles: []
})
export class StaffListComponent implements OnChanges {
  public showCurrentOnly : boolean;
  @Input() staff;
  @Input() filter;

  constructor() {
  }

  ngOnChanges() {
    this.showCurrentOnly = (this.filter !== peopleFilterReducer.ActionTypes.SHOW_ACTUAL_POS)
  }

}
