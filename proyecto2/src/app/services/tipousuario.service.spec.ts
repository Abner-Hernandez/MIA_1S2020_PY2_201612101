import { TestBed } from '@angular/core/testing';

import { TipousuarioService } from './tipousuario.service';

describe('TipousuarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipousuarioService = TestBed.get(TipousuarioService);
    expect(service).toBeTruthy();
  });
});
