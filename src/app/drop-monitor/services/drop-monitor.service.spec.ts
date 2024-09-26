import { TestBed } from '@angular/core/testing';

import { DropMonitorService } from './drop-monitor.service';

describe('DropMonitorService', () => {
  let service: DropMonitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DropMonitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
