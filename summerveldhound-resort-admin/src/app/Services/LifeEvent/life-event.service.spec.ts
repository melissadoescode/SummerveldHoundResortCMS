import { TestBed } from '@angular/core/testing';

import { LifeEventService } from './life-event.service';

describe('LifeEventService', () => {
  let service: LifeEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LifeEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
