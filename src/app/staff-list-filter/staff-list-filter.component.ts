import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";

import * as staffFilterReducer from '../_reducers/staff-filter.reducer';

@Component({
    selector: 'app-staff-list-filter',
    template: `
      <div class="margin-bottom-10">
        <select [ngModel]="defaultFilter" #selectFilter (change)="updateFilter.emit(selectFilter.value)">
            <option *ngFor="let filter of filters" value="{{filter.action}}">
                {{filter.friendly}}
            </option>
        </select>
      </div>
    `
})
export class StaffListFilterComponent implements OnInit {
    public filters = [];
    @Input() defaultFilter = staffFilterReducer.staffFilterSelect[0].action;
    @Output() updateFilter : EventEmitter<any> = new EventEmitter<any>();

    ngOnInit() {
      this.filters = staffFilterReducer.staffFilterSelect.sort((filtera, filterb) => { return filtera.order - filterb.order });
      this.updateFilter.emit(this.defaultFilter);
    };
};
