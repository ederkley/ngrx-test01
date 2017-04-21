import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../_reducers';
import { Person, Assignment } from '../_models/person';
import { PersonActions, AssignmentActions } from '../_actions';
import * as fromRoot from '../_reducers';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styles: ['li.selected span { background-color: blue; color: white } ']
})
export class PersonDetailComponent implements OnInit, OnChanges {
  public parentForm: FormGroup;
  private _addingNewAssignment = false;
  private _selectAssignment = false;
  private selectedAssignment$: Observable<Assignment>;
  @Input() person: Person;
  @Input() addingNewPerson = false;
  @Output() updatePerson: EventEmitter<Person> = new EventEmitter<Person>();

  constructor(
    private _store: Store<AppState>,
    private _personActions: PersonActions,
    private _assignmentActions: AssignmentActions,
    private _fb: FormBuilder
  ) {
    this.selectedAssignment$ = _store.select(fromRoot.getAssignmentSelected$);
    this.selectedAssignment$.subscribe(assignment => this._selectAssignment = !!assignment);
    // prepare form
    this.parentForm = _fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
      dateCommenced: ['', [Validators.required]],
      dateDOB: ['']
    });
  };

  ngOnInit() {
    this.parentForm.valueChanges
        .filter(data => this.parentForm.valid)
        .subscribe(data => console.log(JSON.stringify(data)));
  };

  ngOnChanges() {
    // update observable of selected person when it changes
    if (this.person) {
      this.parentForm.patchValue({
          name: this.person.name,
          dateCommenced: this.person.commenceDate && new Date(this.person.commenceDate).toISOString().substring(0, 10),
          dateDOB: this.person.DOB && new Date(this.person.DOB).toISOString().substring(0, 10)
        });
    } else {
      this.parentForm.patchValue({
          name: undefined,
          dateCommenced: new Date().toISOString().substring(0, 10),
          dateDOB: undefined
        });
    };
  };

  onUpdatePerson(formValues) {
    let assignmentForm = this.parentForm.controls['assignment'].value;
    let assignment: Assignment = new Assignment(0,
      assignmentForm.position.id,
      assignmentForm.acting,
      assignmentForm.dateStart,
      assignmentForm.dateEnd,
      assignmentForm.position);
    let person: Person = new Person(
      this.parentForm.controls['name'].value,
      this.parentForm.controls['dateCommenced'].value,
      this.parentForm.controls['dateDOB'].value,
      assignment);
    this.updatePerson.emit(person);
  };

  onUpdateAssignment(assignment: Assignment) {
    if (assignment) {
      assignment = Object.assign({}, assignment, { personId: this.person.id });
      this._store.dispatch(this._assignmentActions.addAssignment(assignment));
    } else {
      this._store.dispatch(this._assignmentActions.selectAssignment(undefined));
    }
    this._addingNewAssignment = false;
    this._selectAssignment = false;
  };

};
