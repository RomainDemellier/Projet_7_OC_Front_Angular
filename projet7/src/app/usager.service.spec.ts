import { TestBed, inject } from '@angular/core/testing';

import { UsagerService } from './usager.service';

describe('UsagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsagerService]
    });
  });

  it('should be created', inject([UsagerService], (service: UsagerService) => {
    expect(service).toBeTruthy();
  }));
});
