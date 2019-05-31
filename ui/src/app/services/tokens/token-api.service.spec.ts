import { TestBed, inject } from '@angular/core/testing';

import { TokenApiService } from './token-api.service';

describe('TokenApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenApiService]
    });
  });

  it('should be created', inject([TokenApiService], (service: TokenApiService) => {
    expect(service).toBeTruthy();
  }));
});
