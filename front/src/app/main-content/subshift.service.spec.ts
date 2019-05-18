import { TestBed } from '@angular/core/testing';

import { SubshiftService } from './subshift.service';

describe('SubshiftService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubshiftService = TestBed.get(SubshiftService);
    expect(service).toBeTruthy();
  });
});
