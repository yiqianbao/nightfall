import { TestBed, inject } from '@angular/core/testing';

import { CoinApiService } from './coin-api.service';

describe('CoinApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoinApiService]
    });
  });

  it('should be created', inject([CoinApiService], (service: CoinApiService) => {
    expect(service).toBeTruthy();
  }));
});
