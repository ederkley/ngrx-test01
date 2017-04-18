import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../_reducers';
import { Person, Assignment } from '../_models/person';
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
  public selectedPerson$: Observable<Person>;
  @Input() addingNew = false;
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
    // update observable of selected person when it changes
    this.selectedPerson$ = _store.select(state => state.peopleState).let(peopleReducer.getSelectedPerson$());
    this.selectedPerson$.subscribe(person => {
      this.form.patchValue({
          name: person.name,
          dateCommenced: new Date(person.commenceDate).toISOString().substring(0, 10),
          dateDOB: person.DOB && new Date(person.DOB).toISOString().substring(0, 10)
        });
    });
  };

  ngOnInit() {
    this.form.valueChanges
        .filter(data => this.form.valid)
        .subscribe(data => console.log(JSON.stringify(data)));
  };

  ngOnChanges() {
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
