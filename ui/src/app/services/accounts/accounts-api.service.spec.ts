import { TestBed, inject } from '@angular/core/testing';

import { AccountsApiService } from './accounts-api.service';

describe('AccountsApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountsApiService]
    });
  });

  it('should be created', inject([AccountsApiService], (service: AccountsApiService) => {
    expect(service).toBeTruthy();
  }));
});
