import { TestBed } from '@angular/core/testing';

import { BoardDataResolver } from './board-data.resolver';

describe('BoardDataResolver', () => {
  let resolver: BoardDataResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BoardDataResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
