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
    console.log('onUpdateAssignment')
    let assignmentForm = this.parentForm.controls['assignment'].value;
    let savedAssignment: Assignment = new Assignment(0,
      assignmentForm.position.id,
      this.parentForm.controls['acting'].value,
      assignmentForm.dateStart,
      assignmentForm.dateEnd,
      assignmentForm.position);
    savedAssignment.id = (this.assignment && this.assignment.id) || 0;
    console.log(savedAssignment);
    this.updateAssignment.emit(savedAssignment);
  };

};
