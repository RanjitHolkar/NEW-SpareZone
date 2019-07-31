import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPreferredListComponent } from './supplier-preferred-list.component';

describe('SupplierPreferredListComponent', () => {
  let component: SupplierPreferredListComponent;
  let fixture: ComponentFixture<SupplierPreferredListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierPreferredListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierPreferredListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
