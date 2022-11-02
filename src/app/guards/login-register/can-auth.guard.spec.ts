import { TestBed } from '@angular/core/testing';

import { CanAuthGuard } from './can-auth.guard';

describe('CanAuthGuard', () => {
  let guard: CanAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
