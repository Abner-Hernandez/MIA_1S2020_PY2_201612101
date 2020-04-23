import { TestBed } from '@angular/core/testing';

import { TipoclienteService } from './tipocliente.service';

describe('TipoclienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoclienteService = TestBed.get(TipoclienteService);
    expect(service).toBeTruthy();
  });
});
