import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsSettingComponent } from './cms-setting.component';

describe('CmsSettingComponent', () => {
  let component: CmsSettingComponent;
  let fixture: ComponentFixture<CmsSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
