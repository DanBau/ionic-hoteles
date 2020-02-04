import { TestBed } from '@angular/core/testing';

import { HoteldbService } from './hoteldb.service';

describe('HoteldbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HoteldbService = TestBed.get(HoteldbService);
    expect(service).toBeTruthy();
  });
});
