import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TranslateApiService } from './translate-api.service';

describe('TranslateApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [ TranslateApiService, { provide: XHRBackend, useClass: MockBackend }],
    });
  });

  it('should be created', inject([TranslateApiService], (service: TranslateApiService) => {
    expect(service).toBeTruthy();
  }));
});
