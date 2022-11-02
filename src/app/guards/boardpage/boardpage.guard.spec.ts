import { TestBed } from '@angular/core/testing';

import { BoardpageGuard } from './boardpage.guard';

describe('BoardpageGuard', () => {
  let guard: BoardpageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BoardpageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
