import { TestBed } from '@angular/core/testing';

import { MyValidatorService } from './my-validator.service';

describe('MyValidatorService', () => {
  let service: MyValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
