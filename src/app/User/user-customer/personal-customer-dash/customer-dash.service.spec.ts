import { TestBed } from '@angular/core/testing';

import { CustomerDashService } from './customer-dash.service';

describe('CustomerDashService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerDashService = TestBed.get(CustomerDashService);
    expect(service).toBeTruthy();
  });
});
