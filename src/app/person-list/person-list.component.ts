import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import { AppState } from '../_reducers';
import { Person } from '../_models/person';
import { PersonActions, AssignmentActions } from '../_actions';
import * as fromRoot from '../_reducers';
import { StaffFilterActionTypes } from '../_actions/staff-filter.actions';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styles: ['li.selected span { background-color: blue; color: white } ']
})
export class PersonListComponent implements OnChanges {
  private _showCurrentOnly : boolean;
  private _showLastAssignment: boolean;
  public selectedPerson$;
  @Input() staff;
  @Input() filter;

  constructor(
    private _store: Store<AppState>,
    private personActions: PersonActions,
    private assignmentActions: AssignmentActions
  ) { 
    // update observable of selected person when it changes
    this.selectedPerson$ = _store.select(fromRoot.getPersonSelected$);
  };
  
  ngOnChanges() {
    this._showCurrentOnly = (this.filter != StaffFilterActionTypes.SHOW_ACTUAL_POS);
    this._showLastAssignment = (this.filter == StaffFilterActionTypes.SHOW_EXSTAFF);
  };

  onSelectPerson(person) {
    this._store.dispatch(this.personActions.selectPerson(person));
    this._store.dispatch(this.assignmentActions.selectAssignment(undefined));
  };

};
