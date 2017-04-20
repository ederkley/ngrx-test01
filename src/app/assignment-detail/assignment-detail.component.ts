import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import * as fromRoot from '../_reducers';
import { Assignment, Position } from '../_models/person';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html'
})
export class AssignmentDetailComponent implements OnInit {
  public childForm: FormGroup;
  @Input() parentForm: FormGroup;
  @Input() assignment: Assignment;

  constructor(
  ) {
  };

  ngOnInit() {
  };

  ngOnChanges() {
    if (this.assignment) {
      this.childForm.patchValue({
          position: this.assignment.position,
          dateStart: new Date(this.assignment.startDate).toISOString().substring(0, 10),
          dateEnd: this.assignment.endDate && new Date(this.assignment.endDate).toISOString().substring(0, 10),
          acting: this.assignment.acting
        });
    } else {
      this.childForm.patchValue({
          position: undefined,
          dateStart: new Date().toISOString().substring(0, 10),
          dateEnd: undefined,
          acting: false
        });
    };
  };

  onUpdateAssignment() {
    let assignment: Assignment = new Assignment(0, 
      this.childForm.controls['position'].value.id,
      this.childForm.controls['acting'].value,
      this.childForm.controls['dateStart'].value,
      this.childForm.controls['dateEnd'].value);
    //this.updateAssignment.emit(assignment);
  };

};
