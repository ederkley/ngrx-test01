import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { AppState } from '../_reducers';
import { Person } from '../_models/person';
//import * as staffReducer from '../_reducers/staff.reducer';
import { StaffFilterActionTypes } from '../_actions/staff-filter.actions';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styles: ['li.selected span { background-color: blue; color: white } ']
})
export class PersonListComponent implements OnChanges {
  public showCurrentOnly : boolean;
  @Input() people: Person[];
  @Input() filter;
  @Input() selectedPerson: Person;
  @Output() selectPerson : EventEmitter<Person> = new EventEmitter<Person>();

  ngOnChanges() {
    this.showCurrentOnly = (this.filter != StaffFilterActionTypes.SHOW_ACTUAL_POS);
  };

  onSelectPerson(person: Person) {
    this.selectedPerson = person;
    this.selectPerson.emit(person);
  };

};
