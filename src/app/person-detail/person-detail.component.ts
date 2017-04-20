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
  private _form: FormGroup;
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
    this._form = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
      dateCommenced: ['', [Validators.required]],
      dateDOB: [''],
      initialPosition: [this._fb.group({
        position: ['',[Validators.required]],
        dateStart: ['',[Validators.required]],
        dateEnd: [''],
        acting: ['']
      }), [Validators.required]]
    });
  };

  ngOnInit() {
    this._form.valueChanges
        .filter(data => this._form.valid)
        .subscribe(data => console.log(JSON.stringify(data)));
  };

  ngOnChanges() {
    // update observable of selected person when it changes
    if (this.person) {
      this._form.patchValue({
          name: this.person.name,
          dateCommenced: this.person.commenceDate && new Date(this.person.commenceDate).toISOString().substring(0, 10),
          dateDOB: this.person.DOB && new Date(this.person.DOB).toISOString().substring(0, 10)
        });
    } else {
      this._form.patchValue({
          name: undefined,
          dateCommenced: new Date().toISOString().substring(0, 10),
          dateDOB: undefined
        });
    };
  };

  onUpdatePerson() {
    let person: Person = new Person(
      this._form.controls['name'].value,
      this._form.controls['dateCommenced'].value,
      0,
      this._form.controls['dateDOB'].value
    );
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
