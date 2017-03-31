import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/let';

import {Store} from '@ngrx/store';

import { Person, Staff, Assignment } from '../_models/person';
import * as peopleReducer from '../_reducers/people.reducer';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html'
})
export class PersonEditComponent implements OnInit, OnChanges {
  @Input() staff: Staff;
  @Input() addingNew: boolean;
  @Output() updateStaff: EventEmitter<Staff> = new EventEmitter<Staff>();
  public sortedAssignments: Assignment[] = [];
  private _reverseSort = true;
  private _addingAssignment = false;

  constructor(
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (!this.staff || this.addingNew) {
      this.staff = new Staff;
    }
    if (this.staff.assignments) {
      this.sortAssignments();
    }
  }

  changeSort() {
    this._reverseSort = !this._reverseSort;
    this.sortAssignments();
  }

  sortAssignments() {
    this.sortedAssignments = this.staff.assignments.sort((a, b) => { 
      return this._reverseSort ? 
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime() :
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime() });
  }

  cancelAdd() {
    this.addingNew = false;
    this.updateStaff.emit(undefined);
  }

  addAssignment() {
    this._addingAssignment = true;
  }

}
