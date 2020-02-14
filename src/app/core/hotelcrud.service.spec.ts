import { TestBed } from '@angular/core/testing';

import { HotelcrudService } from './hotelcrud.service';

describe('HotelcrudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HotelcrudService = TestBed.get(HotelcrudService);
    expect(service).toBeTruthy();
  });
});
