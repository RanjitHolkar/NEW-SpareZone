import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierSettingComponent } from './supplier-setting.component';

describe('SupplierSettingComponent', () => {
  let component: SupplierSettingComponent;
  let fixture: ComponentFixture<SupplierSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
