import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/let';
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
  public dateExit = new FormControl("");
  private _addingAssignment = false;
  private _selectAssignment = false;
  public selectedStaff$: Observable<Person>;
  @Input() addingNew = false;
  //@Input() staff: Staff;
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
      "dateExit": this.dateExit
    });
    // get selected Staff record whenever changes
    this.selectedStaff$ = _store.select(state => state.peopleState).let(peopleReducer.getSelectedPerson());
    // update selected Staff's assignments whenever assignments change
    //_store.select('assignments').subscribe(assignments => _store.dispatch(staffActions.updateAssignments(assignments)));
    // update form when selected Staff changed
    /*
    this.selectedStaff$.subscribe(selectStaff => {
      if (selectStaff && selectStaff.person) {
        this.form.patchValue({
            name: selectStaff.person.name,
            dateCommenced: new Date(selectStaff.person.commenceDate).toISOString().substring(0, 10),
            dateExit: selectStaff.person.exitDate && new Date(selectStaff.person.exitDate).toISOString().substring(0, 10)
          });
      };
    });
      */
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
