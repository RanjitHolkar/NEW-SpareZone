import { TestBed } from '@angular/core/testing';

import { AdminMaintanceService } from './admin-maintance.service';

describe('AdminMaintanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminMaintanceService = TestBed.get(AdminMaintanceService);
    expect(service).toBeTruthy();
  });
});
