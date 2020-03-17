import { TestBed, inject } from '@angular/core/testing';

import { EmpruntService } from './emprunt.service';

describe('EmpruntService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmpruntService]
    });
  });

  it('should be created', inject([EmpruntService], (service: EmpruntService) => {
    expect(service).toBeTruthy();
  }));
});
