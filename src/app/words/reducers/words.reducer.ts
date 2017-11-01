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
} from './../actions/words.actions';
import { ActionReducer, Action } from '@ngrx/store';
import { WordsActions, WordState } from './../interfaces/words.interfaces';

const initialState: WordState = {
  isPending: false,
  isSuccess: false,
  isError: false,
  model: [],
};

export function wordsReducer(state = initialState, action: WordsActions): WordState {

  switch (action.type) {
    case GET_WORD: {
      return {
        isPending: true,
        isSuccess: false,
        isError: false,
        model: state.model,
      };
    }

    case GET_WORD_SUCCESS: {
      return {
        isPending: false,
        isSuccess: true,
        isError: false,
        model: [ action.payload, ...state.model ],
      };
    }

    case GET_WORD_ERROR: {
      return {
        isPending: false,
        isSuccess: false,
        isError: true,
        model: state.model,
      };
    }

    case DELETE_WORD: {
      return {
        isPending: false,
        isError: false,
        isSuccess: false,
        model: state.model.filter(item => item.id !== action.payload),
      };
    }

    case EDIT_WORD: {
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

    case TRANSLATE_WORD: {
      return {
        isPending: true,
        isError: false,
        isSuccess: false,
        model: state.model,
      };
    }

    case TRANSLATE_WORD_ERROR: {
      return {
        isPending: false,
        isError: true,
        isSuccess: false,
        model: state.model,
      };
    }

    case TRANSLATE_WORD_SUCCESS: {
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

    case CLEAR_DATA: {
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
