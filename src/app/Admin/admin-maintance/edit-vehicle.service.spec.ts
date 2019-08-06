import { TestBed } from '@angular/core/testing';

import { EditVehicleService } from './edit-vehicle.service';

describe('EditVehicleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditVehicleService = TestBed.get(EditVehicleService);
    expect(service).toBeTruthy();
  });
});
