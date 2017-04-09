import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/let';
import {Store} from '@ngrx/store';

import { AppState } from '../_reducers';
import { Person, Staff } from '../_models/person';
import { PersonActions, StaffActions } from '../_actions';
import * as staffReducer from '../_reducers/staff.reducer';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styles: ['li.selected span { background-color: blue; color: white } ']
})
export class StaffDetailComponent implements OnInit, OnChanges {
  form: FormGroup;
  public dateCommenced: string;
  public dateExit: string;
  public name: string;
  @Input() addingNew: boolean;
  @Output() updateStaff: EventEmitter<Staff> = new EventEmitter<Staff>();
  @Input() staff: Staff;

  constructor(
    private _store: Store<AppState>,
    private staffActions: StaffActions,
    private personActions: PersonActions,
    private fb: FormBuilder
  ) {
    // update selected Staff assignments whenever assignments change
    _store.select('assignments').subscribe(assignments => _store.dispatch(staffActions.updateAssignments(assignments)));
  }

  ngOnInit() {
    this.form.valueChanges
        .filter(data => this.form.valid)
        .subscribe(data => console.log(JSON.stringify(data)));
  };

  ngOnChanges() {
    this.name = this.staff.person && this.staff.person.name;
    this.dateCommenced = this.staff.person && new Date(this.staff.person.commenceDate).toISOString().substring(0, 10);
    this.dateExit = this.staff.person && this.staff.person.exitDate && new Date(this.staff.person.exitDate).toISOString().substring(0, 10);
    this.form = this.fb.group({       
      "name": this.name,
      "dateCommenced": this.dateCommenced,
      "dateExit": this.dateExit
    });
  };

  updatePerson() {
      let person: Person = new Person(this.name, new Date(this.dateCommenced), new Date(this.dateExit));
      if (this.addingNew) {
        this._store.dispatch(this.personActions.addPerson(person));
      } else {
        this._store.dispatch(this.personActions.savePerson(person));
      }
  }

  changeSort() {
    this._store.dispatch(this.staffActions.toggleSortAssignmentListOrder());
  };

};
