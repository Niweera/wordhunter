import { GET_ERRORS, CLEAR_ERRORS, VOWELS_ERROR } from "../actions/types";

const initialState = {
  vowelsError: null,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case VOWELS_ERROR:
      return {
        ...state,
        vowelsError: "You can't possibly create words with these characters"
      };
    case CLEAR_ERRORS:
      return { vowelsError: null, error: null };
    default:
      return state;
  }
}
