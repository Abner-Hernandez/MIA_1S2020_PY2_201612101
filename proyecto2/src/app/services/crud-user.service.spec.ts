import { TestBed } from '@angular/core/testing';

import { CrudUserService } from './crud-user.service';

describe('CrudUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrudUserService = TestBed.get(CrudUserService);
    expect(service).toBeTruthy();
  });
});
