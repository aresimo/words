import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { TranslateApiService } from './../../../services/translate-api.service';
import { WordsApiService } from './../../../services/words-api.service';
import { WordsAction } from './words.interfaces';
import * as WordsActions from './words.actions';

@Injectable()
export class WordsEffects {
  @Effect() getWord$: Observable<WordsAction> = this.actions$
    .ofType<WordsAction>(WordsActions.GET_WORD)
    .switchMap(() => this.wordsApiService.word())
    .map(data => new WordsActions.GetWordSuccess(data))
    .catch(error => Observable.of(new WordsActions.GetWordError(error)),
    );

  @Effect() translateWord$: Observable<WordsAction> = this.actions$
    .ofType<WordsAction>(WordsActions.TRANSLATE_WORD)
    .switchMap(action => this.translateApiService.translate(action.payload.word, 'en-pl', 0)
      .map(response => ({ id: action.payload.wordId, translation: response.text[0] })))
    .map(word => new WordsActions.TranslateWordSuccess(word))
    .catch(error => Observable.of(new WordsActions.TranslateWordError(error)));

  private wordId: string;

  constructor(
    private actions$: Actions,
    private wordsApiService: WordsApiService,
    private translateApiService: TranslateApiService,
  ) {}
}
