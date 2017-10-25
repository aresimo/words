import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/';

@Injectable()
export class TranslateApiService {

  constructor(private http: Http) { }

  public translate(wordToTranslate: string, language: string): Observable<any> {
    const apiKey = environment.translateApiKey;
    const url = environment.translateUrl;
    const options = { params: `key=${apiKey}&text=${wordToTranslate}&lang=${language}&format=plain` };
    return this.http.get(url, options);
  }
}
