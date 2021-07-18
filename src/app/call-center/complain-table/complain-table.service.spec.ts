import { TestBed } from '@angular/core/testing';

import { ComplainTableService } from './complain-table.service';

describe('ComplainTableService', () => {
  let service: ComplainTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplainTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
