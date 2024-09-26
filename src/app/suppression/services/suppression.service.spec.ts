import { TestBed } from '@angular/core/testing';

import { SuppressionService } from './suppression.service';

describe('SuppressionService', () => {
  let service: SuppressionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuppressionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
