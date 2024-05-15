import { TestBed } from '@angular/core/testing';

import { SubmittedAssignmentsService } from './submitted-assignments.service';

describe('SubmittedAssignmentsService', () => {
  let service: SubmittedAssignmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmittedAssignmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
