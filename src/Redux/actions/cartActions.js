import * as actionTypes from "../constants/cartConstants";
import axios from "axios";

// Add a book to cart
export const addToCart = (id, qty, saved) => async (dispatch, getState) => {
    const { data } = await axios.get(`/books/${id}`);

    dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: {
            book: data._id,
            title: data.title,
            cover: data.cover,
            price: data.price,
            author: data.author,
            authorName: data.authorName,
            rating: data.rating,
            description: data.description,
            qty,
            saved,
        },
    });
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};


// Remove a book from cart
export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: id,
    });
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};
