import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/';

@Injectable()
export class TranslateApiService {

  public apiKey = environment.translateApiKey;
  public url = environment.translateUrl;

  constructor(private http: HttpClient) { }

  public translate(wordToTranslate: string, language: string, translateOptions: any): Observable<any> {

    let params = new HttpParams();
    params = params.append('key', this.apiKey);
    params = params.append('text', wordToTranslate);
    params = params.append('lang', language);
    params = params.append('options', translateOptions);
    return this.http.get(this.url, { params });
  }
}
