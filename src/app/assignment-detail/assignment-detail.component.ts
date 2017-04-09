import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

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
  public dateStart: string;
  public dateEnd: string;
  public acting = true;
  @Input() addingNew = false;
  @Input() assignment: Assignment;
  @Output() updateAssignment: EventEmitter<Assignment> = new EventEmitter<Assignment>();

  constructor(
      private _store: Store<any>,
      private fb: FormBuilder
    ) {
      _store.select('positions').subscribe(positions => this.positions = positions);
  }

  ngOnInit() {
    this.form.valueChanges
        .filter(data => this.form.valid)
        .subscribe(data => console.log(JSON.stringify(data)));
  }

  ngOnChanges() {
    this.form = this.fb.group({
      "position": this.selectedPosition,
      "dateStart": this.dateStart,
      "dateEnd": this.dateEnd,
      "acting": this.acting
    });
  }

  setAssignment() {
    this.updateAssignment.emit({
      id: 0,
      personId: 0,
      startDate: this.dateStart && new Date(this.dateStart),
      endDate: this.dateEnd && new Date(this.dateEnd),
      positionId: this.selectedPosition && this.selectedPosition.id,
      acting: this.acting,
      position: this.selectedPosition
    });
  };

};
