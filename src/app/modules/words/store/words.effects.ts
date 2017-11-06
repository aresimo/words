import { TranslateApiService } from './../../../services/translate-api.service';
import { WordsApiService } from './../../../services/words-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import {
  GET_WORD,
  GET_WORD_SUCCESS,
  GET_WORD_ERROR,
  TRANSLATE_WORD,
  TRANSLATE_WORD_SUCCESS,
  TRANSLATE_WORD_ERROR } from './../store/words.actions';
import { WordsAction } from './../store/words.interfaces';

@Injectable()
export class WordsEffects {
  @Effect() getWord$: Observable<WordsAction> = this.actions$
    .ofType<WordsAction>(GET_WORD)
    .switchMap(() => this.wordsApi.word)
    .map(data => ({ type: GET_WORD_SUCCESS, payload: data }))
    .catch(err => Observable.of({ type: GET_WORD_ERROR, payload: err }));

  @Effect() translateWord$: Observable<WordsAction> = this.actions$
    .ofType<WordsAction>(TRANSLATE_WORD)
    .switchMap(action => this.translateApiService.translate(action.payload.word, 'en-pl', 0)
      .map(response => ({ id: action.payload.wordId, translation: response.text[0] }))
      .map(word => ({ type: TRANSLATE_WORD_SUCCESS, payload: word }))
      .catch(err => Observable.of({ type: TRANSLATE_WORD_ERROR, payload: err })),
    );

  private wordId: string;

  constructor(
    private actions$: Actions,
    private wordsApi: WordsApiService,
    private translateApiService: TranslateApiService,
  ) {}
}
