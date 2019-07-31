import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiMgmtComponent } from './api-mgmt.component';

describe('ApiMgmtComponent', () => {
  let component: ApiMgmtComponent;
  let fixture: ComponentFixture<ApiMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiMgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
