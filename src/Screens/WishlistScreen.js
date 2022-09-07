import "./WishlistScreen.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import WishlistItem from "../Components/Wishlist/WishlistItem";
import { addToCart } from "../Redux/actions/cartActions";
import { removeFromWishlist } from "../Redux/actions/wishlistActions";
import MessageDialog from "../Components/Cart/UI/MessageDialog";
import Notification from "../Components/Cart/UI/Notification";


const WishlistScreen = ({ history }) => {



  useEffect(() => { }, []);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;
  const [messageDialog, setMessageDialog] = useState({ isOpen: false, title: '', subTitle: '' });
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  // Notification
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '', typeStyle: '' });

  // Add item from wishlist to shopping cart
  const addToCartNew = (id) => {
    dispatch(addToCart(id, 1, false));
    dispatch(removeFromWishlist(id));
    setMessageDialog({
      isOpen: true,
      title: 'Item successfully added to Shopping Cart',
      viewButton: 'View Cart',
      onView: () => { onViewCart(); },
      onKeepShopping: () => { onKeepShopping(); }
    });
  };


  // Remove an item from wishlist
  const removeFromWishlistHandler = (id, title) => {
    dispatch(removeFromWishlist(id));
    setNotify({
      isOpen: true,
      message: `"${title}" was removed from wishlist`,
      type: 'error',
      typeStyle: 'specific'
    });
  };

  const addToCartHandler = (id) => {
    (cartItems.some(item => item.book === id)) ?
      addToCartExistent(id, (cartItems.find((item) => item.book === id).qty))
      :
      addToCartNew(id);
  };

  // Close dialog and go to cart
  const onViewCart = () => {
    setMessageDialog({
      ...messageDialog,
      isOpen: false
    });
    history.push(`/cart`);
  };

  // Close dialog and stay in current page
  const onKeepShopping = () => {
    setMessageDialog({
      ...messageDialog,
      isOpen: false
    });
  };



  // Add an item already existent in cart (increment by new qty)
  const addToCartExistent = (id, currQty) => {
    dispatch(addToCart(id, Number(currQty) + Number(1), false));
    dispatch(removeFromWishlist(id));
    setMessageDialog({
      isOpen: true,
      title: 'Item successfully updated in Shopping Cart',
      viewButton: 'View Cart',
      onView: () => { onViewCart(); },
      onKeepShopping: () => { onKeepShopping(); }
    });
  };


  return (
    <>
      <div className="cartscreen">
        <div className="centered_header">
          Wishlist
        </div>
        <div className="cartscreen__info">
          {
            wishlistItems.length === 0 ?
              (<div className="cartscreen__center">
                <h1>Your Wishlist is Empty!</h1>
                <Link to="/browse" className="Router_Link">
                  <div className="cart_button">
                    <p>Keep Shopping</p>
                  </div>
                </Link>

              </div>
              )
              :
              (wishlistItems.map((item, i) => (
                <div key={item.book}>
                  <WishlistItem
                    key={item.book}
                    item={item}
                    removeHandler={removeFromWishlistHandler}
                    bookId={item.book}
                    addToCartHandler={addToCartHandler}
                  />
                  {i < wishlistItems.length - 1 && <hr />}
                </div>
              )))}
        </div>
      </div>
      <MessageDialog
        messageDialog={messageDialog}
        setMessageDialog={setMessageDialog}
      />
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
    </>
  );
};



export default WishlistScreen;
