import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styles: []
})
export class StaffListComponent implements OnChanges {

  @Input() staff;

  constructor() {
  }

  ngOnChanges() {
    console.log('Staff-list change');
    console.dir(this.staff);
  }

}
