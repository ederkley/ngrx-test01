import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import 'hammerjs';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { PersonData } from './_mockapi/person-api';

import reducer from './_reducers';
import { PersonEffects, AssignmentEffects, PositionEffects } from './_effects';
import { PersonActions, AssignmentActions, PositionActions, StaffActions } from './_actions';

import { PersonService } from './_services/person.service';

import { AppComponent } from './app.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffListFilterComponent } from './staff-list-filter/staff-list-filter.component';
import { StaffEditComponent } from './staff-edit/staff-edit.component';
import { StaffAssignmentComponent } from './staff-assignment/staff-assignment.component';

@NgModule({
  declarations: [
    AppComponent,
    StaffListComponent,
    StaffListFilterComponent,
    StaffEditComponent,
    StaffAssignmentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    StoreModule.provideStore(reducer),
    EffectsModule.run(PersonEffects),
    EffectsModule.run(AssignmentEffects),
    EffectsModule.run(PositionEffects),
    InMemoryWebApiModule.forRoot(PersonData)
  ],
  providers: [PersonService, PersonActions, AssignmentActions, PositionActions, StaffActions],
  bootstrap: [AppComponent]
})
export class AppModule { }
