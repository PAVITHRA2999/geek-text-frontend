import "./CartScreen.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../Components/Cart/CartItem";
import Notification from "../Components/Cart/UI/Notification";
import ConfirmDialog from "../Components/Cart/UI/ConfirmDialog";
import SignInFirstDialog from "../Components/Cart/UI/SignInFirstDialog";
import { addToCart, removeFromCart } from "../Redux/actions/cartActions";
import axios from "axios";


const CartScreen = (props) => {

  useEffect(() => { }, []);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Confirm Dialog
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });

  // Signin First Dialog
  const [signInFirstDialog, setSignInFirstDialog] = useState({ isOpen: false, title: '', subTitle: '' });

  // Notification
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '', typeStyle: '' });

  // Items saved for later
  const savedForLater = cartItems.filter(({ saved }) => saved === true);

  // Items in cart (not including saved for later)
  const inCart = cartItems.filter(({ saved }) => saved === false);

  // User token
  const token = localStorage.getItem('token') || false;

  // Change quantity of item
  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty, false));
  };

  // Save an item for later
  const saveForLaterHandler = (id, qty) => {
    dispatch(addToCart(id, qty, true));
  };

  // Add item from 'saved for later' to shopping cart
  const addBackToCartHandler = (id, qty) => {
    dispatch(addToCart(id, qty, false));
  };

  // Remove an item from shopping cart and display message
  const removeFromCartHandler = (id, title) => {
    dispatch(removeFromCart(id));
    setNotify({
      isOpen: true,
      message: `"${title}" was removed from cart`,
      type: 'error',
      typeStyle: 'specific'
    });
  };

  // Checkout every book in cart close dialog and display success message
  const onContinue = () => {
    inCart.map((item) => checkout(item.book, item.qty));
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    });
    setNotify({
      isOpen: true,
      message: 'Checkout completed successfully',
      type: 'success',
      typeStyle: ''
    });
  };

  // Update sold count of book and stop displaying it in cart
  const checkout = (id, qty) => {
    // TODO: Database update: add books to user's purchased books
    axios.patch(`https://lea-geek-text.herokuapp.com/books/purchase/${id}`, {
      sold: qty,
    });
    dispatch(removeFromCart(id));
  };

  // Checkout all books in cart and display success message
  const checkoutHandler = () => {
    token ?
      setConfirmDialog({
        isOpen: true,
        title: 'Are you sure you want to checkout?',
        subTitle: "You can't undo this operation",
        onContinue: () => { onContinue(); }
      }) :
      setSignInFirstDialog({
        isOpen: true,
        title: 'You are not signed in',
        subTitle: 'Please sign in before checkout',
      });
  };

  // Get number of items saved for later
  const getSavedCount = () => {
    return savedForLater.length;
  };

  // Get number of items in shopping cart
  const getCartCount = () => {
    return inCart.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  // Get subtotal
  const getCartSubTotal = () => {
    return inCart
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };


  return (
    <>
      <div className="cartscreen">
        <div className="centered_cart">
          <h1><b>Shopping Cart</b></h1>
        </div>
        <div className="cartscreen__info">

          {inCart.length === 0 ? (

            cartItems.length !== 0 ?
              (<div className="cartscreen__center">
                <h1>Your Shopping Cart Is Empty!</h1>
                <p></p>
                <p>But you have some items saved for later...</p>
                <Link to="/browse">
                  <div className="cart_button">
                    <p>Continue Shopping</p>
                  </div>
                </Link>
              </div>
              )
              :
              (
                <div className="cartscreen__center">
                  <h1>Your Shopping Cart Is Empty.</h1>
                  <p></p>
                  <p>Add some books!</p>
                  <div></div>
                  <Link to="/browse">
                    <div className="cart_button">
                      <p>Start Shopping</p>
                    </div>
                  </Link>
                </div>)
          )
            :
            (
              inCart.map((item) => (
                <div key={item.book}>
                  <CartItem
                    key={item.book}
                    item={item}
                    qtyChangeHandler={qtyChangeHandler}
                    removeHandler={removeFromCartHandler}
                    saveForLaterHandler={saveForLaterHandler}
                    addBackToCartHandler={addBackToCartHandler}
                    saved={false}
                    bookId={item.book}
                  />
                  <hr />
                </div>
              )))}

          <div className="right-subtotal">
            Subtotal ({getCartCount()}) {getCartCount() === 1 ? <>item:</> : <>items:</>}
            <div className="subtotal">&emsp;&emsp;${getCartSubTotal()}
            </div>
            <div></div>
            <button onClick={() => checkoutHandler()} className="cart_button_checkout" disabled={inCart.length === 0}>
              Proceed to Checkout
            </button>
            <Notification
              notify={notify}
              setNotify={setNotify}
            />
            <ConfirmDialog
              confirmDialog={confirmDialog}
              setConfirmDialog={setConfirmDialog}
            />
            <SignInFirstDialog
              signInFirstDialog={signInFirstDialog}
              setSignInFirstDialog={setSignInFirstDialog}
            />
          </div>
        </div>

        {savedForLater.length !== 0 ? (
          <div >
            <div className="centered_saved">
              <h2>Saved for Later</h2>
            </div>
            <div className="cartscreen__info_saved">
              {savedForLater.map((item) => (
                <div key={item.book}>
                  <CartItem
                    key={item.book}
                    item={item}
                    qtyChangeHandler={qtyChangeHandler}
                    removeHandler={removeFromCartHandler}
                    saveForLaterHandler={saveForLaterHandler}
                    addBackToCartHandler={addBackToCartHandler}
                    saved={true}
                    bookId={item.book}
                  />
                  <hr />
                </div>
              )
              )}
              <div className="number_of_items_saved">
                ({getSavedCount()}) {getSavedCount() === 1 ? <>item:</> : <>items:</>}
              </div>
            </div>
          </div>
        ) : ""
        }
      </div>
    </>
  );
};

export default CartScreen;
