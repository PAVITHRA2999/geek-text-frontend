import * as actionTypes from "../constants/authorConstants";
import axios from "axios";


// Get a specific author from database
export const getBooksByAuthor = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_AUTHOR_BOOKS_REQUEST });
    const { data } = await axios.get(`/authors/getbooksby/${id}`);
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