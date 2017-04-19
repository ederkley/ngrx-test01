import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import {Store} from '@ngrx/store';

import { Assignment } from '../_models/person';
import { Position } from '../_models/person';
import * as fromRoot from '../_reducers';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html'
})
export class AssignmentDetailComponent implements OnInit {
  form: FormGroup;
  public positions$: Observable<any>;
  public selectedPosition: Position;
  public dateStart = new FormControl("", Validators.required);
  public dateEnd = new FormControl("");
  public acting = new FormControl("", Validators.required);
  @Input() addingNewPerson = false;
  @Input() addingNewAssignment = false;
  @Input() assignment: Assignment;
  @Output() updateAssignment: EventEmitter<Assignment> = new EventEmitter<Assignment>();

  constructor(
      private _store: Store<any>,
      private fb: FormBuilder
  ) {
    this.positions$ = _store.select(fromRoot.getPositionsList$);
    this.form = this.fb.group({
      "position": this.selectedPosition,
      "dateStart": this.dateStart,
      "dateEnd": this.dateEnd,
      "acting": this.acting
    });
  };

  ngOnInit() {
    this.form.valueChanges
        .filter(data => this.form.valid)
        .subscribe(data => console.log(JSON.stringify(data)));
  };

  ngOnChanges() {
    if (this.assignment) {
      this.form.patchValue({
          position: this.assignment.position,
          dateStart: new Date(this.assignment.startDate).toISOString().substring(0, 10),
          dateEnd: this.assignment.endDate && new Date(this.assignment.endDate).toISOString().substring(0, 10),
          acting: this.assignment.acting
        });
    } else {
      this.form.patchValue({
          position: undefined,
          dateStart: new Date().toISOString().substring(0, 10),
          dateEnd: undefined,
          acting: false
        });
    };
  };

  saveAssignment() {
    let assignment: Assignment = new Assignment(0, 
      this.form.controls['position'].value.id,
      this.form.controls['acting'].value,
      this.form.controls['dateStart'].value,
      this.form.controls['dateEnd'].value);
    this.updateAssignment.emit(assignment);
  };

};
