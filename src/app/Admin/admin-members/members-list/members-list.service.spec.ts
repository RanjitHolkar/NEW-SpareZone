import { TestBed } from '@angular/core/testing';

import { MembersListService } from './members-list.service';

describe('MembersListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MembersListService = TestBed.get(MembersListService);
    expect(service).toBeTruthy();
  });
});
