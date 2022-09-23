import * as actionTypes from "../constants/authorConstants";
import axios from "axios";

//${process.env.HEROKU_DOMAIN}
// Get a specific author from database
export const getBooksByAuthor = (id) => async (dispatch) => {

  try {
    dispatch({ type: actionTypes.GET_AUTHOR_BOOKS_REQUEST });
    const baseURL = {
      dev: 'http://localhost:5000/authors/getbooksby/',
      prod: `${process.env.REACT_APP_BACKEND_URL}/authors/getbooksby/`,
    };
    const url =
      process.env.NODE_ENV === 'production' ? baseURL.prod : baseURL.dev;

    const { data } = await axios.get(`${url}${id}`);
    dispatch({
      type: actionTypes.GET_AUTHOR_BOOKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_AUTHOR_BOOKS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
