import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsCategoryComponent } from './parts-category.component';

describe('PartsCategoryComponent', () => {
  let component: PartsCategoryComponent;
  let fixture: ComponentFixture<PartsCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
