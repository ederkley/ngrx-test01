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
  form: FormGroup;
  public name = new FormControl("", Validators.required);
  public email = new FormControl("", [
    Validators.pattern("[^ @]*@[^ @]*")
  ]);
  public dateCommenced = new FormControl("", Validators.required);
  public dateDOB = new FormControl("");

  private _addingNewAssignment = false;
  private _selectAssignment = false;
  private selectedAssignment$: Observable<Assignment>;
  @Input() person: Person;
  @Input() addingNewPerson = false;
  @Output() updatePerson: EventEmitter<Person> = new EventEmitter<Person>();

  constructor(
    private _store: Store<AppState>,
    private personActions: PersonActions,
    private assignmentActions: AssignmentActions,
    private fb: FormBuilder
  ) {
    this.selectedAssignment$ = _store.select(fromRoot.getAssignmentSelected$);
    this.selectedAssignment$.subscribe(assignment => {
      console.log(assignment);
      this._selectAssignment = !!assignment
    });
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
    // update observable of selected person when it changes
    if (this.person) {
      this.form.patchValue({
          name: this.person.name,
          dateCommenced: this.person.commenceDate && new Date(this.person.commenceDate).toISOString().substring(0, 10),
          dateDOB: this.person.DOB && new Date(this.person.DOB).toISOString().substring(0, 10)
        });
    } else {
      this.form.patchValue({
          name: undefined,
          dateCommenced: new Date().toISOString().substring(0, 10),
          dateDOB: undefined
        });
    };
  };

  onUpdatePerson() {
  }

  onUpdateAssignment(assignment: Assignment) {
    if (assignment) {
      assignment = Object.assign({}, assignment, { personId: this.person.id });
      this._store.dispatch(this.assignmentActions.addAssignment(assignment));
    } else {
      this._store.dispatch(this.assignmentActions.selectAssignment(undefined));
    }
    this._addingNewAssignment = false;
    this._selectAssignment = false;
  };

};
