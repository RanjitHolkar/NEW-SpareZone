import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehicleChildComponent } from './edit-vehicle-child.component';

describe('EditVehicleChildComponent', () => {
  let component: EditVehicleChildComponent;
  let fixture: ComponentFixture<EditVehicleChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVehicleChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVehicleChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
