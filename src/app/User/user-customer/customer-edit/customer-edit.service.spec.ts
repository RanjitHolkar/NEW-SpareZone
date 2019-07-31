import { TestBed } from '@angular/core/testing';

import { CustomerEditService } from './customer-edit.service';

describe('CustomerEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerEditService = TestBed.get(CustomerEditService);
    expect(service).toBeTruthy();
  });
});
