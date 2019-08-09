import { TestBed } from '@angular/core/testing';

import { AdminSupplierService } from './admin-supplier.service';

describe('AdminSupplierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminSupplierService = TestBed.get(AdminSupplierService);
    expect(service).toBeTruthy();
  });
});
