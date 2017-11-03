import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TranslateApiService } from './translate-api.service';

describe('TranslateApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ TranslateApiService ],
    });
  });

  it('should be created', inject([TranslateApiService], (service: TranslateApiService) => {
    expect(service).toBeTruthy();
  }));
});
