import { TestBed } from '@angular/core/testing';

import { AdminSettingService } from './admin-setting.service';

describe('AdminSettingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminSettingService = TestBed.get(AdminSettingService);
    expect(service).toBeTruthy();
  });
});
