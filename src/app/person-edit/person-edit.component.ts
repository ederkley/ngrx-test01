import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/let';

import {Store} from '@ngrx/store';

import { Person, Staff, Assignment } from '../_models/person';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html'
})
export class PersonEditComponent implements OnInit, OnChanges {
  @Input() staff: Staff;
  @Input() addingNew: boolean;
  @Output() updateStaff: EventEmitter<any> = new EventEmitter<any>();
  @Output() addAssignment: EventEmitter<any> = new EventEmitter<any>();
  public sortedAssignments: Assignment[] = [];
  private _reverseSort = true;

  constructor(
    private _store: Store<any>
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

}
