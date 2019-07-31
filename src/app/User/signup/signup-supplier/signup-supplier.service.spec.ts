import { TestBed } from '@angular/core/testing';

import { SignupSupplierService } from './signup-supplier.service';

describe('SignupSupplierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SignupSupplierService = TestBed.get(SignupSupplierService);
    expect(service).toBeTruthy();
  });
});
