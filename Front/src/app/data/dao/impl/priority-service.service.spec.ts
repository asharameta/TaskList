import { TestBed } from '@angular/core/testing';

import { PriorityServiceService } from './priority-service.service';

describe('PriorityServiceService', () => {
  let service: PriorityServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriorityServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
