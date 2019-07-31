import { TestBed } from '@angular/core/testing';

import { BusinessCustomerDashService } from './business-customer-dash.service';

describe('BusinessCustomerDashService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessCustomerDashService = TestBed.get(BusinessCustomerDashService);
    expect(service).toBeTruthy();
  });
});
