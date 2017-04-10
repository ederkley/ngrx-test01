import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/let';
import {Store} from '@ngrx/store';

import { AppState } from '../_reducers';
import { Person, Staff } from '../_models/person';
import { PersonActions, StaffActions, AssignmentActions } from '../_actions';
import * as staffReducer from '../_reducers/staff.reducer';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styles: ['li.selected span { background-color: blue; color: white } ']
})
export class StaffDetailComponent implements OnInit, OnChanges {
  form: FormGroup;
  public name = new FormControl("", Validators.required);
  public email = new FormControl("", [
    Validators.pattern("[^ @]*@[^ @]*")
  ]);
  public dateCommenced = new FormControl("", Validators.required);
  public dateExit = new FormControl("");
  private _addingAssignment = false;
  private _selectAssignment = false;
  @Input() addingNew = false;
  @Input() staff: Staff;
  @Output() updateStaff: EventEmitter<Staff> = new EventEmitter<Staff>();

  constructor(
    private _store: Store<AppState>,
    private staffActions: StaffActions,
    private personActions: PersonActions,
    private assignmentActions: AssignmentActions,
    private fb: FormBuilder
  ) {
    // update selected Staff assignments whenever assignments change
    _store.select('assignments').subscribe(assignments => _store.dispatch(staffActions.updateAssignments(assignments)));
    this.form = this.fb.group({
      "name": this.name,
      "dateCommenced": this.dateCommenced,
      "dateExit": this.dateExit
    });
  }

  ngOnInit() {
    this.form.valueChanges
        .filter(data => this.form.valid)
        .subscribe(data => console.log(JSON.stringify(data)));
  };

  ngOnChanges() {
    this.form.patchValue({
        name: this.staff.person && this.staff.person.name,
        dateCommenced: this.staff.person && new Date(this.staff.person.commenceDate).toISOString().substring(0, 10),
        dateExit: this.staff.person && this.staff.person.exitDate && new Date(this.staff.person.exitDate).toISOString().substring(0, 10)
      });
  };

  updatePerson() {
      let person: Person = new Person(this.form.controls['name'].value, new Date(this.form.controls['dateCommenced'].value), new Date(this.form.controls['dateExit'].value));
      if (this.addingNew) {
        this._store.dispatch(this.personActions.addPerson(person));
      } else {
        this._store.dispatch(this.personActions.savePerson(person));
      }
  }

  addAssignment() {
    this._addingAssignment = true;
    this._store.dispatch(this.assignmentActions.selectAssignment(undefined));
  };

  updateAssignment(assignment) {
    if (assignment) {
      assignment = Object.assign({}, assignment, { personId: this.staff.person.id });
      this._store.dispatch(this.assignmentActions.addAssignment(assignment));
    } else {
      this._store.dispatch(this.assignmentActions.selectAssignment(undefined));
    }
    this._addingAssignment = false;
    this._selectAssignment = false;
  };

};
