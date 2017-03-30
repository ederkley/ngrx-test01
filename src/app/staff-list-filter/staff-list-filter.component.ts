import {Component, OnInit, Output, EventEmitter} from "@angular/core";

import * as peopleFilterReducer from '../_reducers/people-filter.reducer';

@Component({
    selector: 'app-staff-list-filter',
    template: `
      <div class="margin-bottom-10">
        <select #selectList (change)="updateFilter.emit(selectList.value)">
            <option *ngFor="let filter of filters" value="{{filter.action}}">
                {{filter.friendly}}
            </option>
        </select>
      </div>
    `
})
export class StaffListFilterComponent implements OnInit {
    public filters = []
    @Output() updateFilter : EventEmitter<any> = new EventEmitter<any>();

    ngOnInit() {
      this.filters = peopleFilterReducer.peopleFilterSelect;
    };
};