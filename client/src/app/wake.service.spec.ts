import { TestBed, inject } from '@angular/core/testing';

import { WakeService } from './wake.service';

describe('WakeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WakeService]
    });
  });

  it('should ...', inject([WakeService], (service: WakeService) => {
    expect(service).toBeTruthy();
  }));
});
