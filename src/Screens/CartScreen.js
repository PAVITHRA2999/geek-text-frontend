import "./CartScreen.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../Components/Cart/CartItem/CartItem";
import Notification from "../Components/Cart/UI/Notification";
import ConfirmDialog from "../Components/Cart/UI/ConfirmDialog";
import SignInFirstDialog from "../Components/Cart/UI/SignInFirstDialog";
import { addToCart, removeFromCart } from "../Redux/actions/cartActions";
import { addToWishlist } from "../Redux/actions/wishlistActions";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

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

  // Collapsible
  const [colapse, setCollapse] = useState(false);

  // Change quantity of item
  const toggleCollapse = () => {
    setCollapse(!colapse);
  };

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

  // Add item to wishlist, remove it from shopping cart, and display message
  const addToWishlistHandler = (id, title) => {
    dispatch(addToWishlist(id));
    dispatch(removeFromCart(id));
    setNotify({
      isOpen: true,
      message: `"${title}" was added to your wishlist`,
      type: 'success',
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
      <div className="nav-bottom" style={{ display: getCartCount() === 0 && 'none' }}>
        <div className="right-subtotal">
          <div className="right-subtotal-text">
            <div className="subtotal-description">
              ORDER TOTAL
            </div>
            <div className="subtotal">&emsp;&emsp;${getCartSubTotal()}
            </div>
          </div>
          <div></div>
          <button onClick={() => checkoutHandler()} className="btn btn-primary btn-checkout" disabled={getCartCount() === 0}>
            CONTINUE TO CHECKOUT
          </button>
        </div>
      </div>
      <div className="nav-bottom" style={{ display: getCartCount() !== 0 && 'none' }}>
        <div className="right-subtotal">
          <Link to="/browse">
            <div className="btn btn-primary btn-checkout">
              CONTINUE SHOPPING
            </div>
          </Link>
          <div></div>
          <Link to="/auth">
            <div className="btn btn-light btn-checkout">
              SIGN IN
            </div>
          </Link>
        </div>
      </div>
      <div className="cartscreen">
        <div className="centered_header">
          Shopping Cart
        </div>
        <div className="cartscreen__info">

          {inCart.length === 0 ?
            (<>
              <div className="cartscreen__center">
                <div className="cart_message">
                  <div className="cart_upper_message">
                    <p>Your cart is empty.</p>
                  </div>
                  <div className="cart_bottom_message">
                    <p>Add some books and get free shipping on orders of $40+.</p>
                  </div>
                </div>
              </div>
            </>)
            :
            (
              inCart.map((item, i) => (

                <div key={item.book}>

                  <CartItem
                    key={item.book}
                    item={item}
                    qtyChangeHandler={qtyChangeHandler}
                    removeHandler={removeFromCartHandler}
                    addToWishlistHandler={addToWishlistHandler}
                    saveForLaterHandler={saveForLaterHandler}
                    addBackToCartHandler={addBackToCartHandler}
                    saved={false}
                    bookId={item.book}
                  />
                  {i < inCart.length - 1 && <hr />}
                </div>
              )))}

          <div className="top-subtotal">
            <div className="flex-section">
              <div >
                Subtotal ({getCartCount()}) {getCartCount() === 1 ? <>item:</> : <>items:</>}
              </div>
              <div >
                ${getCartSubTotal()}
              </div>
            </div>
            <div className="flex-section">
              <div>
                Estimated Shipping
              </div>
              <div >
                $0.00
              </div>
            </div>
            <div className="flex-section">
              <div>
                Estimated Tax
              </div>
              <div >
                $0.00
              </div>
            </div>
            <button onClick={() => checkoutHandler()} className="btn btn-primary btn-checkout" disabled={getCartCount() === 0}>
              CHECKOUT
            </button>
          </div>
        </div>
        {savedForLater.length !== 0 &&
          <>
            <div className="collapsible_items">
              <div className="centered_saved collapsible_header" onClick={() => toggleCollapse()}>
                Saved for Later ({savedForLater.length})
                {colapse ?
                  <RemoveIcon />
                  :
                  <AddIcon />
                }
              </div>
              {colapse &&
                <div className="cartscreen__info_saved collapsible_content">
                  {savedForLater.map((item, i) => (
                    <>
                      <CartItem
                        key={item.book}
                        item={item}
                        qtyChangeHandler={qtyChangeHandler}
                        removeHandler={removeFromCartHandler}
                        addToWishlistHandler={addToWishlistHandler}
                        saveForLaterHandler={saveForLaterHandler}
                        addBackToCartHandler={addBackToCartHandler}
                        saved={true}
                        bookId={item.book}
                      />
                      {i < savedForLater.length - 1 && <hr />}
                    </>
                  )
                  )}
                  <div className="number_of_items_saved">
                    ({getSavedCount()}) {getSavedCount() === 1 ? <>item</> : <>items</>}
                  </div>
                </div>
              }
            </div>
            <div className="non_collapsible_items">
              <div className="centered saved_for_later_header" onClick={() => toggleCollapse()}>
                <h3>Saved for Later ({savedForLater.length})</h3>
              </div>

              <div className="cartscreen__info_saved">
                {savedForLater.map((item, i) => (
                  <>
                    <CartItem
                      key={item.book}
                      item={item}
                      qtyChangeHandler={qtyChangeHandler}
                      removeHandler={removeFromCartHandler}
                      addToWishlistHandler={addToWishlistHandler}
                      saveForLaterHandler={saveForLaterHandler}
                      addBackToCartHandler={addBackToCartHandler}
                      saved={true}
                      bookId={item.book}
                    />
                    {i < savedForLater.length - 1 && <hr />}
                  </>
                )
                )}
                <div className="number_of_items_saved">
                  ({getSavedCount()}) {getSavedCount() === 1 ? <>item</> : <>items</>}
                </div>
              </div>

            </div>
          </>
        }
        <div className="shaded_section">
          <div className="shaded_subsection">
            <div >
              Subtotal ({getCartCount()} {getCartCount() === 1 ? <>item</> : <>items</>})
            </div>
            <div >
              ${getCartSubTotal()}
            </div>
          </div>
          <div className="shaded_subsection">
            <div>
              Estimated Shipping
            </div>
            <div >
              $0.00
            </div>
          </div>
          <div className="shaded_subsection">
            <div>
              Estimated Tax
            </div>
            <div >
              $0.00
            </div>
          </div>
        </div>
      </div>

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
    </>
  );
};

export default CartScreen;
