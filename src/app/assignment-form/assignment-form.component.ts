import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import * as fromRoot from '../_reducers';
import { Assignment } from '../_models/person';

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html'
})
export class AssignmentFormComponent implements OnInit {
  public parentForm: FormGroup;
  @Input() addingNewPerson = false;
  @Input() addingNewAssignment = false;
  @Input() assignment: Assignment;
  @Output() updateAssignment: EventEmitter<Assignment> = new EventEmitter<Assignment>();

  constructor(
      private _fb: FormBuilder
  ) {
    this.parentForm = _fb.group({
      acting: ['']
    });
  };

  ngOnInit() {
    this.parentForm.valueChanges
        .filter(data => this.parentForm.valid)
        .subscribe(data => console.log(JSON.stringify(data)));
  };

  ngOnChanges() {
    if (this.assignment) {
      this.parentForm.patchValue({
          acting: this.assignment.acting
        });
    } else {
      this.parentForm.patchValue({
          acting: false
        });
    };
  };

  onUpdateAssignment() {
    let assignment: Assignment = new Assignment(0, 
      this.parentForm.controls['acting'].value,
      this.parentForm.controls['assignment'].value.controls['position'].value.id,
      this.parentForm.controls['dateStart'].value,
      this.parentForm.controls['dateEnd'].value);
    console.dir(assignment);
    this.updateAssignment.emit(assignment);
  };

};
