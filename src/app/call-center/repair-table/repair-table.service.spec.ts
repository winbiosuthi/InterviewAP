import { TestBed } from '@angular/core/testing';

import { RepairTableService } from './repair-table.service';

describe('RepairTableService', () => {
  let service: RepairTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepairTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
