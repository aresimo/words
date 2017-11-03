import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/';

@Injectable()
export class WordsApiService {

  constructor(private http: Http) {}

  public get word(): Observable<any> {
    const apiKey = environment.wordsApiKey;
    const url = environment.wordsApiUrl;
    const options = { params: `api_key=${apiKey}&includePartOfSpeech=noun&hasDictionaryDef=true&minDictionaryCount=1` };
    return this.http.get(url, options);
  }
}
