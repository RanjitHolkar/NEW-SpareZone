import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalCustomerSidebarComponent } from './personal-customer-sidebar.component';

describe('PersonalCustomerSidebarComponent', () => {
  let component: PersonalCustomerSidebarComponent;
  let fixture: ComponentFixture<PersonalCustomerSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalCustomerSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalCustomerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
