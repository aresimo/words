import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { WordsApiService } from './words-api.service';

describe('WordsApiAccessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [ WordsApiService, { provide: XHRBackend, useClass: MockBackend } ],
    });
  });

  it('should be created', inject([WordsApiService], (service: WordsApiService) => {
    expect(service).toBeTruthy();
  }));
});
