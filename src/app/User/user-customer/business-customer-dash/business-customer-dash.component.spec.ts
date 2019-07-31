import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCustomerDashComponent } from './business-customer-dash.component';

describe('BusinessCustomerDashComponent', () => {
  let component: BusinessCustomerDashComponent;
  let fixture: ComponentFixture<BusinessCustomerDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessCustomerDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCustomerDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
