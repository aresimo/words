import { wordsReducer } from './words.reducer';
import {
  GET_WORD_ERROR,
  GET_WORD,
  GET_WORD_SUCCESS,
  DELETE_WORD,
  EDIT_WORD,
  CLEAR_DATA,
  TRANSLATE_WORD,
  TRANSLATE_WORD_ERROR,
  TRANSLATE_WORD_SUCCESS,
} from './../store/words.actions';

describe('Words reducers', () => {

  it('should handle initial state', (): void => {
    expect(true).toBeTruthy();
  });
});
