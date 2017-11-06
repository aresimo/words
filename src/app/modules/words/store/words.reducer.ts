import { ActionReducer, Action } from '@ngrx/store';

import { WordState, WordsAction } from './words.interfaces';
import * as wordsActions from './words.actions';

const initialState: WordState = {
  isPending: false,
  isSuccess: false,
  isError: false,
  model: [],
};

export function wordsReducer(state = initialState, action: wordsActions.All): WordState {

  switch (action.type) {
    case wordsActions.GET_WORD: {
      return {
        isPending: true,
        isSuccess: false,
        isError: false,
        model: state.model,
      };
    }

    case wordsActions.GET_WORD_SUCCESS: {
      return {
        isPending: false,
        isSuccess: true,
        isError: false,
        model: [ action.payload, ...state.model ],
      };
    }

    case wordsActions.GET_WORD_ERROR: {
      return {
        isPending: false,
        isSuccess: false,
        isError: true,
        model: state.model,
      };
    }

    case wordsActions.DELETE_WORD: {
      return {
        isPending: false,
        isError: false,
        isSuccess: false,
        model: state.model.filter(item => item.id !== action.payload),
      };
    }

    case wordsActions.EDIT_WORD: {
      const newModel = state.model.map((item) => {
        return item.id === action.payload.id
          ? { ...item, word: action.payload.word, translation: '' }
          : item;
      });

      return {
        isPending: false,
        isError: false,
        isSuccess: false,
        model: newModel,
      };
    }

    case wordsActions.TRANSLATE_WORD: {
      return {
        isPending: true,
        isError: false,
        isSuccess: false,
        model: state.model,
      };
    }

    case wordsActions.TRANSLATE_WORD_ERROR: {
      return {
        isPending: false,
        isError: true,
        isSuccess: false,
        model: state.model,
      };
    }

    case wordsActions.TRANSLATE_WORD_SUCCESS: {
      const newModel = state.model.map((item) => {
        return item.id === action.payload.id
          ? { ...item, translation: action.payload.translation }
          : item;
      });
      return {
        isPending: false,
        isError: false,
        isSuccess: false,
        model: newModel,
      };
    }

    case wordsActions.CLEAR_DATA: {
      return {
        isPending: false,
        isError: false,
        isSuccess: false,
        model: [],
      };
    }

    default: {
      return state;
    }
  }
}
