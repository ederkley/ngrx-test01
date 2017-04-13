import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import 'hammerjs';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api'; // remove mock
import { PersonData } from './_mockapi/person-api'; // remove mock

import reducer from './_reducers';
import { PersonEffects, AssignmentEffects, PositionEffects } from './_effects';
import { PersonActions, AssignmentActions, PositionActions, StaffFilterActions } from './_actions';

import { PersonService } from './_services/person.service';

import { AppComponent } from './app.component';
import { StaffListFilterComponent } from './staff-list-filter/staff-list-filter.component';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { AssignmentListComponent } from './assignment-list/assignment-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    StaffListFilterComponent,
    PersonDetailComponent,
    AssignmentDetailComponent,
    AssignmentListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    StoreModule.provideStore(reducer),
    EffectsModule.run(PersonEffects),
    EffectsModule.run(AssignmentEffects),
    EffectsModule.run(PositionEffects),
    InMemoryWebApiModule.forRoot(PersonData) // remove mock
  ],
  providers: [PersonService, PersonActions, AssignmentActions, PositionActions, StaffFilterActions],
  bootstrap: [AppComponent]
})
export class AppModule { }
