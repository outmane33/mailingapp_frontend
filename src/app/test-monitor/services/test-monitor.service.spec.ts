import { TestBed } from '@angular/core/testing';

import { TestMonitorService } from './test-monitor.service';

describe('TestMonitorService', () => {
  let service: TestMonitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestMonitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
