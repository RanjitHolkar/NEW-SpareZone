import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsFeedbackComponent } from './reports-feedback.component';

describe('ReportsFeedbackComponent', () => {
  let component: ReportsFeedbackComponent;
  let fixture: ComponentFixture<ReportsFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
