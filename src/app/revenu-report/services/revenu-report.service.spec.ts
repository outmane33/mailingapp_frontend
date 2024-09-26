import { TestBed } from '@angular/core/testing';

import { RevenuReportService } from './revenu-report.service';

describe('RevenuReportService', () => {
  let service: RevenuReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevenuReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
