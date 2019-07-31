import { TestBed } from '@angular/core/testing';

import { SupplierPreferredListService } from './supplier-preferred-list.service';

describe('SupplierPreferredListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupplierPreferredListService = TestBed.get(SupplierPreferredListService);
    expect(service).toBeTruthy();
  });
});
