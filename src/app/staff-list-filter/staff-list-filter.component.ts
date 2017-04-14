import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import * as staffFilterReducer from '../_reducers/staff-filter.reducer';

@Component({
    selector: 'app-staff-list-filter',
    templateUrl: "./staff-list-filter.component.html"
})
export class StaffListFilterComponent implements OnInit {
    form: FormGroup;
    public filters = [];
    selectFilter: any;
    @Input() defaultFilter: any;
    @Output() updateFilter : EventEmitter<any> = new EventEmitter<any>();

    constructor(private fb: FormBuilder) {
        this.filters = staffFilterReducer.staffFilterSelect.sort((filtera, filterb) => { return filtera.order - filterb.order });
    };

    ngOnInit() {
        this.form = this.fb.group({
            "selectFilter": this.defaultFilter
        });
        this.form.valueChanges
            .filter(data => this.form.valid)
            .subscribe(data => {
                this.updateFilter.emit(data.selectFilter);
            });
    };
};
