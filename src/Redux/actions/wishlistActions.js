import * as actionTypes from "../constants/wishlistConstants";
import axios from "axios";


//add item to wishlist
export const addToWishlist = (id) => async (dispatch, getState) => {
    const baseURL = {
        dev: 'http://localhost:5000/books',
        prod: 'https://lea-geek-text.herokuapp.com/books',
    };
    const url =
        process.env.NODE_ENV === 'production' ? baseURL.prod : baseURL.dev;

    const { data } = await axios.get(`${url}/${id}`);

    dispatch({
        type: actionTypes.ADD_TO_WISHLIST,
        payload: {
            book: data._id,
            title: data.title,
            cover: data.cover,
            price: data.price,
            author: data.author,
            authorName: data.authorName,
            rating: data.rating,
            description: data.description,
        },
    });
    localStorage.setItem("wishlist", JSON.stringify(getState().wishlist.wishlistItems));
};


//remove item from wishlist
export const removeFromWishlist = (id) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.REMOVE_FROM_WISHLIST,
        payload: id,
    });
    localStorage.setItem("wishlist", JSON.stringify(getState().wishlist.wishlistItems));
};
