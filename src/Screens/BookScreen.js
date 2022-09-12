import "./BookScreen.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBookDetails } from "../Redux/actions/bookActions";
import { addToCart } from "../Redux/actions/cartActions";
import { addToWishlist, removeFromWishlist } from "../Redux/actions/wishlistActions";
import BookCoverModal from '../Components/Modal/BookCoverModal';
import { Link } from "react-router-dom";
import MessageDialog from "../Components/Cart/UI/MessageDialog";
import { CircularProgress } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import CustomSelect from "../Components/CustomSelect/CustomSelect";
import { useParams } from "react-router";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Notification from "../Components/Cart/UI/Notification";

const BookScreen = ({ match, history }) => {

  const { id } = useParams();
  const [show, setShow] = useState(false);


  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const bookDetails = useSelector((state) => state.getBookDetails);
  const { loading, error, book } = bookDetails;
  const [messageDialog, setMessageDialog] = useState({ isOpen: false, title: '', subTitle: '', viewButton: 'View Cart' });
  // Notification
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '', typeStyle: '' });

  useEffect(() => {
    if (book && (match.params.id) !== book._id) {
      dispatch(getBookDetails(match.params.id));
    }
  }, [dispatch, book, match]);

  // Determine whether item is already in wishlist and handle favorite state accordingly
  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;

  const isFavorited = wishlistItems.some((item) => item.book === id);


  const [favorited, setFavorited] = useState(isFavorited);

  // Determine whether item is already in cart and handle add operation accordingly
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = () => {
    (cartItems.some(item => item.book === book._id)) ?
      addToCartExistent(cartItems.find((item) => item.book === book._id).qty)
      :
      addToCartNew();
  };

  const onViewWishlist = () => {
    setMessageDialog({
      ...messageDialog,
      isOpen: false
    });
    history.push(`/wishlist/` + match.params.id);
  };

  // Close dialog and go to cart
  const onViewCart = () => {
    setMessageDialog({
      ...messageDialog,
      isOpen: false
    });
    history.push(`/cart/` + match.params.id + "?qty=" + qty);
  };

  // Close dialog and stay in current page
  const onKeepShopping = () => {
    setMessageDialog({
      ...messageDialog,
      isOpen: false
    });
  };

  // Add to cart (user can decide whether to stay in current page or view cart)
  const addToCartNew = () => {
    dispatch(addToCart(book._id, qty, false));
    setMessageDialog({
      isOpen: true,
      title: 'Item successfully added to Shopping Cart',
      viewButton: 'View Cart',
      onView: () => { onViewCart(); },
      onKeepShopping: () => { onKeepShopping(); }
    });
  };

  // Add an item already existent in cart (increment by new qty)
  const addToCartExistent = (currQty) => {
    dispatch(addToCart(book._id, Number(currQty) + Number(qty), false));
    setMessageDialog({
      isOpen: true,
      title: 'Item successfully updated in Shopping Cart',
      viewButton: 'View Cart',
      onView: () => { onViewCart(); },
      onKeepShopping: () => { onKeepShopping(); }
    });
  };

  // Add to cart (user can decide whether to stay in current page or view cart)
  const addToWishlistNew = () => {
    addToWishlistHandler();

    setMessageDialog({
      isOpen: true,
      title: 'Item successfully added to Wishlist',
      viewButton: 'View Wishlist',
      onView: () => { onViewWishlist(); },
      onKeepShopping: () => { onKeepShopping(); }
    });
  };

  const addToWishlistHandler = () => {
    dispatch(addToWishlist(book._id));
    setFavorited(true);
  };

  const removeFromWishlistHandler = () => {
    dispatch(removeFromWishlist(book._id));
    setNotify({
      isOpen: true,
      message: `"${book.title}" was removed from your wishlist`,
      type: 'success',
      typeStyle: 'specific'
    });
    setFavorited(false);
  };



  //handles going to the review page
  const createReviewHandler = () => {
    history.push(`/book/` + match.params.id + "/reviews");
  };


  const publisher = ((book || {}).publishingInfo || {}).publisher;
  const isbn = ((book || {}).publishingInfo || {}).isbn;
  const edition = ((book || {}).publishingInfo || {}).edition;
  const genre = ((book || {}).genre || {}).name;
  const bio = ((book || {}).author || {}).bio;
  const authorID = ((book || {}).author || {})._id;
  const commentsLength = ((book || {}).comments || {}).length;
  const arr = Array.from({ length: 100 }, (_, index) => index + 1);
  const items = arr.reduce((a, v) => ({ ...a, [v]: v }), {});

  return (
    <div className="screen">
      {
        loading ? (
          <div className="circular_progress">
            <CircularProgress className="circular_progress" color="inherit" />
          </div>
        ) : error ? (
          <h2>{error}</h2>
        ) :
          (
            <>
              <div className="container">
                <div className="container__main">
                  <div className="container__left">
                    <input type="image" src={book.cover} title="click to enlarge" alt="book cover" className="book-cover" onClick={() => setShow(true)} />
                    <BookCoverModal title="Book Cover" onClose={() => setShow(false)} show={show}>
                      <img src={book.cover} alt="book cover" className="book-cover-large" />
                    </BookCoverModal>
                  </div>
                  <Notification
                    notify={notify}
                    setNotify={setNotify}
                  />

                  <div className="container__right">
                    <div >
                      <div className="title__heading">
                        <div>{book.title}</div>
                        <div>
                          {
                            favorited ?
                              <FavoriteIcon className="fav-icon" onClick={removeFromWishlistHandler} />
                              :
                              <FavoriteBorderIcon className="fav-icon" onClick={addToWishlistNew} />
                          }
                        </div>
                      </div>
                      <div className="rating__heading"><Rating name="half-rating-read" size="small" value={book.rating} precision={0.1} readOnly /> <div> {book.rating} ({commentsLength})</div></div>
                      <div className="author__heading">by <Link to={`/authorbooks/${authorID}`}>{book.authorName}</Link></div>
                      <hr className="top_section" />
                    </div>


                    <div className="middle-upper-section">
                      <div className="price_qty_container">
                        <div className="price">
                          <span>${parseFloat(book.price).toFixed(2)}</span>
                        </div>
                        <CustomSelect
                          className="book-details-qty"
                          inputLabel="Qty"
                          inputLabelId="qty-select-label"
                          labelId="Qty"
                          id="qty-select-rating"
                          value={qty}
                          handleChange={(e) => setQty(e.target.value)}
                          items={items}
                        />
                      </div>
                      <div className="add_to_cart_btn">
                        <button className="btn btn-primary btn-full" onClick={addToCartHandler}>
                          ADD TO CART
                        </button>
                      </div>

                      {/* change button to selector */}
                      <MessageDialog
                        messageDialog={messageDialog}
                        setMessageDialog={setMessageDialog}
                      />

                    </div>

                    <div className="mini_section">
                      <div className="book_details_heading book_details_heading_bottom">
                        Product Details:
                      </div>
                      <div className="details_block text_body">
                        <div>
                          <div>Publisher:</div>
                          <div>ISBN:</div>
                          <div>Edition:</div>
                          <div>Genre:</div>
                        </div>
                        <div>
                          <div>{publisher}</div>
                          <div>{isbn}</div>
                          <div>{edition}</div>
                          <div>{genre}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="section">
                  <div className="book_details_heading_center book_details_heading book_details_heading_bottom">Overview</div>
                  <div className="text_body overview_section"> {book.description}</div>
                </div>
                <hr />
                <div className="smaller_section">
                  <div className="section smaller_section_content">
                    <div className="book_details_heading_center book_details_heading book_details_heading_bottom">
                      About the Author
                    </div>
                    <div className="text_body">
                      {bio}
                    </div>
                  </div>
                </div>
                {/* <hr /> */}
                <div className="large-padding">
                  <hr />
                  <div className="section">
                    {
                      <div>
                        <div className="inline-header">
                          <div className="author__center book_details_heading">
                            Reviews
                          </div>

                          <div className="rating__heading overall_reviews"> Overall <Rating name="half-rating-read" size="small" value={book.rating} precision={0.1} readOnly />
                            {book.rating} | {commentsLength} Reviews <button className="btn btn-primary" onClick={createReviewHandler}>Write a review</button>
                          </div>

                        </div>

                        {
                          commentsLength > 0 ?
                            <div>
                              <div className="num_of_reviews">
                                1-{commentsLength} of {commentsLength} Reviews
                              </div>
                              <hr />
                              {

                                (book.comments).map((comment, i) => <div key={comment.commenter}>
                                  <div className="comment_container">
                                    <div className="text_body commenter"><b>{comment.commenter}</b></div>

                                    <div className="comments" key={comment.commenter}>

                                      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                                      <div className="rating_title"> <Rating value={comment.rating} precision={0.1} size="small" readOnly /> {comment.title} </div>
                                      <div className="text_body">{comment.content}</div>
                                    </div>
                                  </div>
                                  {i < commentsLength - 1 && <hr />}
                                </div>

                                )} </div> :
                            <div className="text_body" >
                              This item doesn't have any reviews yet.
                            </div>

                        }


                      </div>
                    }
                  </div>
                </div>
              </div>
            </>
          )
      }


    </div >
  );
};

export default BookScreen;
;
