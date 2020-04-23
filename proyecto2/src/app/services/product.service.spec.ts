import { TestBed } from '@angular/core/testing';

import { productService } from './product.service';

describe('productService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: productService = TestBed.get(productService);
    expect(service).toBeTruthy();
  });
});
