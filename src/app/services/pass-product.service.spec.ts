import { TestBed } from '@angular/core/testing';

import { PassProductService } from './pass-product.service';

describe('PassProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassProductService = TestBed.get(PassProductService);
    expect(service).toBeTruthy();
  });
});
