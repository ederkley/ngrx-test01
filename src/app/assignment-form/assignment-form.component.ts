import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import {Store} from '@ngrx/store';

import * as fromRoot from '../_reducers';
import { Assignment, Position } from '../_models/person';

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html'
})
export class AssignmentFormComponent implements OnInit {
  private _form: FormGroup;
  public positions$: Observable<any>;
  @Input() addingNewPerson = false;
  @Input() addingNewAssignment = false;
  @Input() assignment: Assignment;
  @Output() updateAssignment: EventEmitter<Assignment> = new EventEmitter<Assignment>();

  constructor(
      private _store: Store<any>,
      private fb: FormBuilder
  ) {
    this.positions$ = _store.select(fromRoot.getPositionsList$);
    this._form = this.fb.group({
      position: ['',[Validators.required]],
      dateStart: ['',[Validators.required]],
      dateEnd: [''],
      acting: ['']
    });
  };

  ngOnInit() {
    this._form.valueChanges
        .filter(data => this._form.valid)
        .subscribe(data => console.log(JSON.stringify(data)));
  };

  ngOnChanges() {
    if (this.assignment) {
      this._form.patchValue({
          position: this.assignment.position,
          dateStart: new Date(this.assignment.startDate).toISOString().substring(0, 10),
          dateEnd: this.assignment.endDate && new Date(this.assignment.endDate).toISOString().substring(0, 10),
          acting: this.assignment.acting
        });
    } else {
      this._form.patchValue({
          position: undefined,
          dateStart: new Date().toISOString().substring(0, 10),
          dateEnd: undefined,
          acting: false
        });
    };
  };

  onUpdateAssignment() {
    let assignment: Assignment = new Assignment(0, 
      this._form.controls['position'].value.id,
      this._form.controls['acting'].value,
      this._form.controls['dateStart'].value,
      this._form.controls['dateEnd'].value);
    this.updateAssignment.emit(assignment);
  };

};
