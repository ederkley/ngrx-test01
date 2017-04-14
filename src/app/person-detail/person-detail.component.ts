import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {Store} from '@ngrx/store';

import { AppState } from '../_reducers';
import { Person } from '../_models/person';
import { PersonActions, AssignmentActions } from '../_actions';
import * as peopleReducer from '../_reducers/people.reducer';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styles: ['li.selected span { background-color: blue; color: white } ']
})
export class PersonDetailComponent implements OnInit, OnChanges {
  form: FormGroup;
  public name = new FormControl("", Validators.required);
  public email = new FormControl("", [
    Validators.pattern("[^ @]*@[^ @]*")
  ]);
  public dateCommenced = new FormControl("", Validators.required);
  public dateDOB = new FormControl("");
  private _addingAssignment = false;
  private _selectAssignment = false;
  @Input() addingNew = false;
  @Input() person: Person;
  @Output() updatePerson: EventEmitter<Person> = new EventEmitter<Person>();

  constructor(
    private _store: Store<AppState>,
    private personActions: PersonActions,
    private assignmentActions: AssignmentActions,
    private fb: FormBuilder
  ) {
    // prepare form
    this.form = this.fb.group({
      "name": this.name,
      "dateCommenced": this.dateCommenced,
      "dateDOB": this.dateDOB
    });
  };

  ngOnInit() {
    this.form.valueChanges
        .filter(data => this.form.valid)
        .subscribe(data => console.log(JSON.stringify(data)));
  };

  ngOnChanges() {
      this.form.patchValue({
          name: this.person.name,
          dateCommenced: new Date(this.person.commenceDate).toISOString().substring(0, 10),
          dateDOB: this.person.DOB && new Date(this.person.DOB).toISOString().substring(0, 10)
        });
  };

  onUpdatePerson() {
      let person: Person = new Person(this.form.controls['name'].value, new Date(this.form.controls['dateCommenced'].value));
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
    /*
    if (assignment) {
      assignment = Object.assign({}, assignment, { personId: this.staff.person.id });
      this._store.dispatch(this.assignmentActions.addAssignment(assignment));
    } else {
      this._store.dispatch(this.assignmentActions.selectAssignment(undefined));
    }
    this._addingAssignment = false;
    this._selectAssignment = false;
    */
  };

};
