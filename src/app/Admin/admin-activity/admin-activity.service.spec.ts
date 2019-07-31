import { TestBed } from '@angular/core/testing';

import { AdminActivityService } from './admin-activity.service';

describe('AdminActivityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminActivityService = TestBed.get(AdminActivityService);
    expect(service).toBeTruthy();
  });
});
