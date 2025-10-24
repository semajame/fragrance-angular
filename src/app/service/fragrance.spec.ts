import { TestBed } from '@angular/core/testing';

import { FragranceService } from './fragrance';

describe('Fragrance', () => {
  let service: FragranceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FragranceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
