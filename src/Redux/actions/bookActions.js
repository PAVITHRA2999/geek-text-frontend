import * as actionTypes from "../constants/bookConstants";
import axios from "axios";

// Get all books from database
export const getBooks = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_BOOKS_REQUEST });
    const { data } = await axios.get("https://lea-geek-text.herokuapp.com/books");
    dispatch({
      type: actionTypes.GET_BOOKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_BOOKS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get all books from database sorted
export const getSortedBooks = (sort, filter) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_SORTED_BOOKS_REQUEST });
    const { data } = await axios.get(`https://lea-geek-text.herokuapp.com/books/${sort}`, {
      params: {
        filter: filter
      }
    });
    dispatch({
      type: actionTypes.GET_SORTED_BOOKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_SORTED_BOOKS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Axios.get(BOOKS + `${aSortType}`, {
//     params: {
//         filter: filter
//     }
// })

// Get a specific book from database
export const getBookDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_BOOK_DETAILS_REQUEST });
    const { data } = await axios.get(`https://lea-geek-text.herokuapp.com/books/${id}`);
    dispatch({
      type: actionTypes.GET_BOOK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_BOOK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
