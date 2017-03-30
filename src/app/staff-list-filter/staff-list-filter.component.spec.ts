import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffListFilterComponent } from './staff-list-filter.component';

describe('StaffListFilterComponent', () => {
  let component: StaffListFilterComponent;
  let fixture: ComponentFixture<StaffListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
