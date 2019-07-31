import { TestBed } from '@angular/core/testing';

import { SignupCustomerService } from './signup-customer.service';

describe('SignupCustomerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SignupCustomerService = TestBed.get(SignupCustomerService);
    expect(service).toBeTruthy();
  });
});
