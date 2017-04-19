import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import { AppState } from '../_reducers';
import { Person } from '../_models/person';
import { PersonActions } from '../_actions';
import * as reducers from '../_reducers';
import { StaffFilterActionTypes } from '../_actions/staff-filter.actions';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styles: ['li.selected span { background-color: blue; color: white } ']
})
export class PersonListComponent implements OnChanges {
  public showCurrentOnly : boolean;
  public selectedPerson$;
  @Input() staff;
  @Input() filter;

  constructor(
    private _store: Store<AppState>,
    private personActions: PersonActions
  ) { 
    // update observable of selected person when it changes
    this.selectedPerson$ = _store.select(reducers.getPersonSelected$);
  };
  
  ngOnChanges() {
    this.showCurrentOnly = (this.filter != StaffFilterActionTypes.SHOW_ACTUAL_POS);
  };

  onSelectPerson(person) {
    this._store.dispatch(this.personActions.selectPerson(person));
  };

};
