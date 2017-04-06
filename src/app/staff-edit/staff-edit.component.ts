import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/let';
import {Store} from '@ngrx/store';

import { AppState } from '../_reducers';
import { Person, Staff, Assignment } from '../_models/person';
import { PersonActions, AssignmentActions } from '../_actions';

@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html'
})
export class StaffEditComponent implements OnInit, OnChanges {
  @Input() selectedStaff: Staff;
  @Input() addingNew: boolean;
  @Output() updateStaff: EventEmitter<any> = new EventEmitter<any>();
  public selectedAssignment: Observable<Assignment>;
  public sortedAssignments: Assignment[] = [];
  private _reverseSort = true;
  private _selectAssignment = false;
  private _addingAssignment = false;

  constructor(
    private _store: Store<AppState>,
    private assignmentActions: AssignmentActions,
  ) {  
    this.selectedAssignment = _store.select('selectAssignment');
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (!this.selectedStaff || this.addingNew) {
      this.selectedStaff = new Staff;
    }
    if (this.selectedStaff.assignments) {
      this.sortAssignments();
    }
  }

  changeSort() {
    this._reverseSort = !this._reverseSort;
    this.sortAssignments();
  }

  sortAssignments() {
    this.sortedAssignments = this.selectedStaff.assignments.sort((a, b) => { 
      return this._reverseSort ? 
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime() :
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime() });
  }

  selectAssignment(assignment: Assignment) {
    this._selectAssignment = true;
    this._store.dispatch(this.assignmentActions.selectAssignment(assignment));
  };

  addAssignment() {
    this._addingAssignment = true;
  };

  updateAssignment(assignment) {
    if (assignment) {
      assignment = Object.assign({}, assignment, { personId: this.selectedStaff.person.id });
      this._store.dispatch(this.assignmentActions.addAssignment(assignment));
    }
    this._addingAssignment = false;
    this._selectAssignment = false;
  }

}
