import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import 'hammerjs';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { PersonData } from './_mockapi/person-api';

import { people, selectedPerson } from './_reducers/people.reducer';
import { positions } from './_reducers/positions.reducer';
import { assignments } from './_reducers/assignments.reducer';
import { peopleFilter } from './_reducers/people-filter.reducer';

import { PersonService } from './_services/person.service';

import { AppComponent } from './app.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffListFilterComponent } from './staff-list-filter/staff-list-filter.component';
import { PersonEditComponent } from './person-edit/person-edit.component';
import { StaffAssignmentComponent } from './staff-assignment/staff-assignment.component';

@NgModule({
  declarations: [
    AppComponent,
    StaffListComponent,
    StaffListFilterComponent,
    PersonEditComponent,
    StaffAssignmentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    StoreModule.provideStore({people, selectedPerson, positions, assignments, peopleFilter}),
    InMemoryWebApiModule.forRoot(PersonData)
  ],
  providers: [PersonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
