import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/';

@Injectable()
export class TranslateApiService {

  constructor(private http: HttpClient) { }

  public translate(wordToTranslate: string, language: string, translateOptions: any): Observable<any> {
    const apiKey = environment.translateApiKey;
    const url = environment.translateUrl;
    const options = {
      params: `key=${apiKey}&text=${wordToTranslate}&lang=${language}&format=plain&options=${translateOptions}`,
    };
    let params = new HttpParams();
    params = params.append('key', apiKey);
    params = params.append('text', wordToTranslate);
    params = params.append('lang', language);
    params = params.append('options', translateOptions);
    return this.http.get(url, { params });
  }
}
