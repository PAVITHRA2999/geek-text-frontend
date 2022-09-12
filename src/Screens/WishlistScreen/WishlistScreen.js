import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import WishlistItem from "../../Components/Wishlist/WishlistItem";
import { addToCart } from "../../Redux/actions/cartActions";
import { removeFromWishlist } from "../../Redux/actions/wishlistActions";
import MessageDialog from "../../Components/Cart/UI/MessageDialog";
import Notification from "../../Components/Cart/UI/Notification";
import "./WishlistScreen.css";

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
      type: 'success',
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
    <div className="wishlistscreen">
      {
        wishlistItems.length === 0 ?
          (<div className="cartscreen__center">
            SAVE YOUR FAVORITE ITEMS
            <h1>Your Wishlist is Empty!</h1>
            <div className="text_body">
              Want to save the items you love? Just click on the heart icon found on the product image and it will show up here.
            </div>
            <Link to="/browse">

              <button className="btn btn-primary btn-cart">BROWSE</button>

            </Link>
          </div>
          )
          :
          (
            <div>
              <div className="centered_header">
                Your Wishlist
              </div>
              <hr />
              <div className="number_of_items_in_wishlist">
                1 - {wishlistItems.length} of {wishlistItems.length} items
              </div>
              {
                wishlistItems.map((item, i) => (<div key={item.book} >
                  <div className="wishlistscreen__item">
                    <WishlistItem
                      key={item.book}
                      item={item}
                      removeHandler={removeFromWishlistHandler}
                      bookId={item.book}
                      addToCartHandler={addToCartHandler}
                    />

                  </div>
                  {i < wishlistItems.length - 1 && <hr />}
                </div>
                ))
              }
            </div>
          )
      }
      <MessageDialog
        messageDialog={messageDialog}
        setMessageDialog={setMessageDialog}
      />
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
    </div>
  );
};

export default WishlistScreen;
