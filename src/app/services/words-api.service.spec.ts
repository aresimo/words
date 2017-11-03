import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { WordsApiService } from './words-api.service';

describe('WordsApiAccessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ WordsApiService ],
    });
  });

  it('should be created', inject([WordsApiService], (service: WordsApiService) => {
    expect(service).toBeTruthy();
  }));
});
