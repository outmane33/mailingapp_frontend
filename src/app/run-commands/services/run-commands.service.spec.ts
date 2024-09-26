import { TestBed } from '@angular/core/testing';

import { RunCommandsService } from './run-commands.service';

describe('RunCommandsService', () => {
  let service: RunCommandsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RunCommandsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
