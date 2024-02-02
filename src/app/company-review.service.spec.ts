import { TestBed } from '@angular/core/testing';

import { CompanyReviewService } from './company-review.service';

describe('CompanyReviewService', () => {
  let service: CompanyReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
