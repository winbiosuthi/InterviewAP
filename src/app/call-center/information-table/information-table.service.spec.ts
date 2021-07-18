import { TestBed } from '@angular/core/testing';

import { InformationTableService } from './information-table.service';

describe('InformationTableService', () => {
  let service: InformationTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformationTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
