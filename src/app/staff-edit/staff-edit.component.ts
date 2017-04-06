import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/let';
import {Store} from '@ngrx/store';

import { AppState } from '../_reducers';
import { Person, Staff, Assignment } from '../_models/person';
import { PersonActions, StaffActions, AssignmentActions } from '../_actions';

@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html'
})
export class StaffEditComponent implements OnInit, OnChanges {
  public selectedStaff: Observable<Staff>;
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
    private staffActions: StaffActions
  ) {
    this.selectedStaff = _store.select('selectStaff');
    this.selectedAssignment = _store.select('selectAssignment');    
    // sort Assignments when selected staff changed
    this.selectedStaff.subscribe(staff => {
      this.sortedAssignments = staff.assignments.sort((a, b) => {
        return this._reverseSort ? 
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime() :
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime() });
    });
    // update selected Staff assignments whenever assignments change
    _store.select('assignments').subscribe(assignments => _store.dispatch(staffActions.updateAssignments(assignments)));
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  changeSort() {
    this._reverseSort = !this._reverseSort;
  };

  selectAssignment(assignment: Assignment) {
    this._selectAssignment = true;
    this._store.dispatch(this.assignmentActions.selectAssignment(assignment));
  };

  addAssignment() {
    this._addingAssignment = true;
    this._store.dispatch(this.assignmentActions.selectAssignment(undefined));
  };

  updateAssignment(assignment) {
    if (assignment) {
      let thisStaff: Staff;
      this.selectedStaff.subscribe(staff => thisStaff = staff);
      assignment = Object.assign({}, assignment, { personId: thisStaff.person.id });
      this._store.dispatch(this.assignmentActions.addAssignment(assignment));
    };
    this._addingAssignment = false;
    this._selectAssignment = false;
  };

};
