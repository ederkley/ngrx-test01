import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import * as fromRoot from '../_reducers';
import { Assignment, Position } from '../_models/person';
import { dateToField, todayToField } from '../util';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html'
})
export class AssignmentDetailComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() assignment: Assignment;
  public childForm: FormGroup;
  public positions$: Observable<any>;

  constructor(
    private _store: Store<any>,
    private _fb: FormBuilder
  ) {
    this.positions$ = _store.select(fromRoot.getPositionsList$);
    this.childForm = _fb.group({
        position: ['',[Validators.required]],
        dateStart: ['',[Validators.required]],
        dateEnd: ['']
      });
  };

  ngOnInit() {
    this.parentForm.addControl('assignment', this.childForm);
  };

  ngOnChanges() {
    if (this.assignment) {
      this.childForm.patchValue({
          position: this.assignment.position,
          dateStart: dateToField(this.assignment.startDate),
          dateEnd: dateToField(this.assignment.endDate)
        });
    } else {
      this.childForm.patchValue({
          position: undefined,
          dateStart: todayToField(),
          dateEnd: ""
        });
    };
  };

};
