import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import {Store} from '@ngrx/store';

import { Assignment } from '../_models/person';
import { Position } from '../_models/person';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html'
})
export class AssignmentDetailComponent implements OnInit {
  form: FormGroup;
  public positions;
  public selectedPosition: Position;
  public dateStart = new FormControl("", Validators.required);
  public dateEnd = new FormControl("");
  public acting = new FormControl("", Validators.required);
  @Input() addingNew = false;
  @Input() assignment: Assignment;
  @Output() updateAssignment: EventEmitter<Assignment> = new EventEmitter<Assignment>();

  constructor(
      private _store: Store<any>,
      private fb: FormBuilder
  ) {
    _store.select('positions').subscribe(positions => this.positions = positions);
    this.form = this.fb.group({
      "position": this.selectedPosition,
      "dateStart": this.dateStart,
      "dateEnd": this.dateEnd,
      "acting": this.acting
    });
  }

  ngOnInit() {
    this.form.valueChanges
        .filter(data => this.form.valid)
        .subscribe(data => console.log(JSON.stringify(data)));
  }

  ngOnChanges() {    
    this.form.patchValue({
        position: this.assignment.position,
        dateStart: new Date(this.assignment.startDate).toISOString().substring(0, 10),
        dateEnd: this.assignment.endDate && new Date(this.assignment.endDate).toISOString().substring(0, 10),
        acting: this.assignment.acting
      });
  }

  saveAssignment() {
    let assignment: Assignment = new Assignment(0, 
      this.form.controls['position'].value.id,
      this.form.controls['acting'].value,
      this.form.controls['dateStart'].value,
      this.form.controls['dateEnd'].value,
      this.form.controls['position'].value);
    this.updateAssignment.emit(assignment);
  };

};
