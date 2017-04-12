import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState } from '../_reducers';
import { Person } from '../_models/person';
//import * as staffReducer from '../_reducers/staff.reducer';
import * as staffFilterReducer from '../_reducers/staff-filter.reducer';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styles: ['li.selected span { background-color: blue; color: white } ']
})
export class PersonListComponent implements OnChanges {
  public showCurrentOnly : boolean;
  public selectedPerson: Person;
  //public selectedStaff: Observable<Staff>;
  @Input() people: Person[];
  @Input() filter;
  @Output() selectPerson : EventEmitter<Person> = new EventEmitter<Person>();

  constructor (
    private _store: Store<AppState>
  ) {
    //this.staff = _store.select(stores.staffFilterState).let(staffFilterReducer.getStaffListView());
    //this.selectedStaff = _store.select(state => state.staffState).let(staffReducer.getSelectedStaff());
  };

  ngOnChanges() {
    this.showCurrentOnly = (this.filter != staffFilterReducer.ActionTypes.SHOW_ACTUAL_POS);
  };

  onSelectPerson(person: Person) {
    this.selectedPerson = person;
    this.selectPerson.emit(person);
  };

};
