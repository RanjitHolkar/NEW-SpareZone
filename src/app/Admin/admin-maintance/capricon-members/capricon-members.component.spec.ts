import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapriconMembersComponent } from './capricon-members.component';

describe('CapriconMembersComponent', () => {
  let component: CapriconMembersComponent;
  let fixture: ComponentFixture<CapriconMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapriconMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapriconMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
