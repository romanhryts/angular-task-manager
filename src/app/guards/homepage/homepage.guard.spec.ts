import { TestBed } from '@angular/core/testing';

import { HomepageGuard } from './homepage.guard';

describe('HomepageGuard', () => {
  let guard: HomepageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HomepageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
