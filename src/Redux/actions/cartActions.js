import * as actionTypes from "../constants/cartConstants";
import axios from "axios";

// Add a book to cart
export const addToCart = (id, qty, saved) => async (dispatch, getState) => {
    const baseURL = {
        dev: 'http://localhost:5000/books',
        prod: `${process.env.REACT_APP_BACKEND_URL}/books`,
    };
    const url =
        process.env.NODE_ENV === 'production' ? baseURL.prod : baseURL.dev;

    const { data } = await axios.get(`${url}/${id}`);

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



export const getCartContent = () => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.GET_CART_CONTENT_REQUEST });

        const form_data = new FormData();
        const token = localStorage.getItem('token');
        const baseURL = {
            dev: 'http://localhost:5000/api/cart',
            prod: `${process.env.REACT_APP_BACKEND_URL}/api/cart`,
        };

        const url =
            process.env.NODE_ENV === 'production' ? baseURL.prod : baseURL.dev;


        const { data } = await axios.post(url, form_data, {
            headers: {
                'x-auth-token': token,
            },

        });

        dispatch({
            type: actionTypes.GET_CART_CONTENT_SUCCESS,
            payload: {
                userId: data._id,
                cartContent: data.cart,
            },
        });
        localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));//save user's cart content to local storage
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CART_CONTENT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};



// Remove a book from cart
export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: id,
    });
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};
