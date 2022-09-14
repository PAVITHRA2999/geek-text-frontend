import * as actionTypes from "../constants/authorConstants";
import axios from "axios";

//${process.env.HEROKU_DOMAIN}
// Get a specific author from database
export const getBooksByAuthor = (id) => async (dispatch) => {

  try {
    dispatch({ type: actionTypes.GET_AUTHOR_BOOKS_REQUEST });
    const { data } = await axios.get(`https://lea-geek-text.herokuapp.com/authors/getbooksby/${id}`);
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
