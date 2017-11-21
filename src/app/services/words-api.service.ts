import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/';

@Injectable()
export class WordsApiService {

  constructor(private http: HttpClient) {}

  public word(): Observable<any> {
    const apiKey = environment.wordsApiKey;
    const url = environment.wordsApiUrl;
    let params = new HttpParams();
    params = params.append('api_key', apiKey);
    params = params.append('includePartOfSpeech', 'noun');
    params = params.append('hasDictionaryDef', 'true');
    params = params.append('minDictionaryCount', '1');
    return this.http.get(url, { params });
  }
}
