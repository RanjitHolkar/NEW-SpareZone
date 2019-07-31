import { TestBed } from '@angular/core/testing';

import { SupplierEditService } from './supplier-edit.service';

describe('SupplierEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupplierEditService = TestBed.get(SupplierEditService);
    expect(service).toBeTruthy();
  });
});
