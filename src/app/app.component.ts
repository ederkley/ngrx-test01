import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/skipUntil';
import {Store, provideStore} from '@ngrx/store';

import { PersonActions, AssignmentActions, PositionActions } from './_actions';
import { Person, Position, Assignment } from './_models/person';
import * as fromRoot from './_reducers';
import { StaffFilterActionTypes } from './_actions/staff-filter.actions';

@Component({
    selector: 'app-ngrx',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public people$;
  public staffView$: Observable<any>;
  public filter : string;
  public defaultFilter = StaffFilterActionTypes.SHOW_EXECUTIVE;
  public selectedPerson$: Observable<Person>;
  private _addingPerson = false;
  private _selectedPerson = false;
  public hasLoaded$: Observable<boolean>;
  errorMessage: string;

  constructor(
    private _store: Store<fromRoot.AppState>,
    private personActions: PersonActions,
    private assignmentActions: AssignmentActions,
    private positionActions: PositionActions
  ) {
    // set hasLoaded flag when people, assignments and positions finished loading
    this.hasLoaded$ = Observable.combineLatest(
      _store.select(fromRoot.getPeopleHaveLoaded$),
      _store.select(fromRoot.getAssignmentsHaveLoaded$),
      _store.select(fromRoot.getPositionsHaveLoaded$)
    ).map(([peopleHasLoaded, assignmentsHasLoaded, positionsHasLoaded]) => !!peopleHasLoaded && !!assignmentsHasLoaded && !!positionsHasLoaded);    

    // update staff list whenever people, assignments, positions or filter changes
    this.staffView$ = _store.select(fromRoot.getStaffListView$);

    // update total people whenever people changes
    this.people$ = _store.select(fromRoot.getPeopleList$);
    
    // load people, assignments and positions
    this._store.dispatch(this.personActions.loadPeople());
    this._store.dispatch(this.assignmentActions.loadAssignments());
    this._store.dispatch(this.positionActions.loadPositions());

    // update observable of selected person when it changes
    this.selectedPerson$ = _store.select(fromRoot.getPersonSelected$);
    this.selectedPerson$.subscribe(person => {
      this._selectedPerson = !!person;
    });

    // set default filter
    this.updateFilter(this.defaultFilter);
  };

  ngOnInit() {
  };

  updateFilter(newFilter : string) {
    this.filter = newFilter;
    this._store.dispatch({type: newFilter});
  };

  addNewPerson() {
    this._addingPerson = true;
    this._store.dispatch(this.personActions.selectPerson(undefined));
  };

  updatePerson(person) {
    if (person) {
      if (this._addingPerson) {
        this._store.dispatch(this.personActions.addPerson(person));
      } else {
        this._store.dispatch(this.personActions.savePerson(person));
      };
    } else {
      this._store.dispatch(this.personActions.selectPerson(undefined));
    };
    this._addingPerson = false;
  };

}
