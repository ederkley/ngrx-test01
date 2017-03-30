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

import { people } from './_reducers/people.reducer';
import { positions } from './_reducers/positions.reducer';
import { assignments } from './_reducers/assignments.reducer';
import { PersonService } from './_services/person.service';

import { AppComponent } from './app.component';
import { StaffListComponent } from './staff-list/staff-list.component';

@NgModule({
  declarations: [
    AppComponent,
    StaffListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    StoreModule.provideStore({people, positions, assignments}),
    InMemoryWebApiModule.forRoot(PersonData)
  ],
  providers: [PersonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
