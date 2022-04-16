import { TestBed } from '@angular/core/testing';

import { IsBloggerGuard } from './is-blogger.guard';

describe('IsBloggerGuard', () => {
  let guard: IsBloggerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsBloggerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
