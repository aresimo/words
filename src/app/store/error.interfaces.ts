import { Action } from '@ngrx/store';

export interface ErrorAction extends Action {
  payload?: any;
}

export interface ErrorData {
  code: number;
  codeText: string;
  errorMessage: string;
}

export interface ErrorState {
  isError: boolean;
  error: ErrorData;
}
