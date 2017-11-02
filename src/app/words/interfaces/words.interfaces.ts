import { Action } from '@ngrx/store';

export type WordsActions = FetchWord
| FetchWordSuccess
| FetchWordError
| TranslateWord
| TranslateWordSuccess
| TranslateWordError;

export interface Word {
  word?: string;
  translation?: string;
  id: number;
}
export interface WordState {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  model: Word[];
}

export interface FetchWord extends Action {
  payload?: null;
}

export interface FetchWordSuccess extends Action {
  payload: Word;
}

export interface FetchWordError extends Action {
  payload: any;
}

export interface TranslateWord extends Action {
  payload?: null;
}

export interface TranslateWordSuccess extends Action {
  payload: any;
}

export interface TranslateWordError extends Action {
  payload: any;
}
