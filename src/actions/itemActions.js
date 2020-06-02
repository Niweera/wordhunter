import {
  GET_ERRORS,
  GET_WORDNIK,
  GET_CHUCK,
  GET_QUOTE,
  ITEM_LOADING,
  GET_WORDS,
  CLEAR_DATA,
  CLEAR_ERRORS,
  VOWELS_ERROR,
} from "./types";
import axios from "axios";

const proxy =
  process.env.NODE_ENV === "development"
    ? ""
    : "https://wordhunter-api.herokuapp.com/anagrams";

export const getWords = (word) => (dispatch) => {
  dispatch(setItemLoading());

  axios
    .get(`${proxy}/${word}`)
    .then((res) => {
      const wordsList =
        res.data && res.data.length > 0
          ? res.data.filter((i) => i.definition !== "Definition not found")
          : [];
      dispatch({
        type: GET_WORDS,
        payload: wordsList,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      if (err.response) {
        console.log(err);
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: { error: "Internal Server Error" },
        });
      }
    });
};

// Get Wordnik Word of The Day https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=5h1rb85kf77nom3iqnjybdjq54nsg3b848i5hejuxy4hqtw0w  https://dict.niweera.gq/hello
export const getWordnik = () => (dispatch) => {
  dispatch(setItemLoading());
  axios
    .get(
      `https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=5h1rb85kf77nom3iqnjybdjq54nsg3b848i5hejuxy4hqtw0w`
    )
    .then((res) =>
      dispatch({
        type: GET_WORDNIK,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Get Chuck Norris Fact
export const getChuck = () => (dispatch) => {
  dispatch(setItemLoading());
  axios
    .get(`https://api.icndb.com/jokes/random`)
    .then((res) =>
      dispatch({
        type: GET_CHUCK,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Get Chuck Norris Fact
export const getQuote = () => (dispatch) => {
  dispatch(setItemLoading());
  axios
    .get(`https://favqs.com/api/qotd`)
    .then((res) =>
      dispatch({
        type: GET_QUOTE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Item loading
export const setItemLoading = () => {
  return {
    type: ITEM_LOADING,
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

// Clear data
export const clearData = () => {
  return {
    type: CLEAR_DATA,
  };
};

// Set vowelError
export const setVowelsError = () => {
  return {
    type: VOWELS_ERROR,
  };
};
