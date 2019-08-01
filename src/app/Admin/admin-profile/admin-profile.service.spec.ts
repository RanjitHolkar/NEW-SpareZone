import { TestBed } from '@angular/core/testing';

import { AdminProfileService } from './admin-profile.service';

describe('AdminProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminProfileService = TestBed.get(AdminProfileService);
    expect(service).toBeTruthy();
  });
});
