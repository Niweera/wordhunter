import {
  GET_WORDNIK,
  GET_CHUCK,
  ITEM_LOADING,
  GET_QUOTE
} from "../actions/types";

const initialState = {
  quote: null,
  chuck: null,
  wordnik: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ITEM_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_WORDNIK:
      return {
        ...state,
        wordnik: action.payload,
        loading: false
      };
    case GET_QUOTE:
      return {
        ...state,
        quote: action.payload,
        loading: false
      };
    case GET_CHUCK:
      return {
        ...state,
        chuck: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
