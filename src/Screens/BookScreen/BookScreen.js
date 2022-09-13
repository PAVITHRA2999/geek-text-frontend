import "./BookScreen.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getBookDetails } from "../../Redux/actions/bookActions";
import { addToCart } from "../../Redux/actions/cartActions";
import { addToWishlist, removeFromWishlist } from "../../Redux/actions/wishlistActions";

import MessageDialog from "../../Components/Cart/UI/MessageDialog";
import BookCoverModal from '../../Components/Modal/BookCoverModal';
import CustomSelect from "../../Components/CustomSelect/CustomSelect";
import Notification from "../../Components/Cart/UI/Notification";
import Accordion from "../../Components/Accordion/Accordion";

import { CircularProgress } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


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

  const aBook = (book || {});
  const description = (book || {}).description;
  const publisher = ((book || {}).publishingInfo || {}).publisher;
  const isbn = ((book || {}).publishingInfo || {}).isbn;
  const edition = ((book || {}).publishingInfo || {}).edition;
  const genre = ((book || {}).genre || {}).name;
  const bio = ((book || {}).author || {}).bio;
  const authorID = ((book || {}).author || {})._id;
  const commentsLength = ((book || {}).comments || {}).length;
  const arr = Array.from({ length: 100 }, (_, index) => index + 1);
  const items = arr.reduce((a, v) => ({ ...a, [v]: v }), {});


  const Heart = ({ favorited, heartClass }) => {
    return (
      <div className={`heart ${heartClass}`}>
        {
          favorited ?
            <FavoriteIcon className="fav-icon" onClick={removeFromWishlistHandler} />
            :
            <FavoriteBorderIcon className="fav-icon" onClick={addToWishlistNew} />
        }
      </div>
    );
  };


  const TopSection = ({ className, book }) => {
    return (<div className={className}>
      <div className="title__heading">
        <div>{book.title}</div>
        <Heart
          heartClass="heart__heading"
          favorited={favorited}
        />
      </div>
      <div className="author__heading">
        by <Link to={`/authorbooks/${authorID}`}>{book.authorName}</Link>
      </div>
      <div className="rating__heading">
        <Rating
          name="half-rating-read"
          size="small"
          value={book.rating}
          precision={0.1}
          readOnly
        />
        <div>
          {book.rating} ({commentsLength})
        </div>
      </div>
    </div>);
  };

  const ProductDetails = () => {
    return (
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
    );
  };

  const AddToCart = ({ book }) => {
    return (<div className="middle-upper-section">
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

      <button className="btn btn-primary btn-full btn-checkout" onClick={addToCartHandler}>
        ADD TO CART
      </button>

    </div>);
  };


  const RatingHeader = ({ rating }) => {
    return (<div className="rating-header"><div className="ave_rating">
      Average Customer Ratings
    </div>
      <div className="rating__heading overall_reviews">

        Overall
        <Rating name="half-rating-read"
          size="small"
          value={rating}
          precision={0.1}
          readOnly
        />
        {rating}
        <div className="reviews_number">
          |
        </div>
        <div className="reviews_number">
          {commentsLength} Reviews
        </div>
        <button
          className="btn btn-primary btn-stars"
          onClick={createReviewHandler}>
          Write a review
        </button>
      </div>
    </div>);
  };


  const accordion_data = [
    {
      heading: 'Product Details',
      content: <ProductDetails />
    },
    {
      heading: 'Overview',
      content: description
    },
    {
      heading: 'About the Author',
      content: bio
    }
  ];
  return (
    <>
      <div className="nav-bottom add-to-cart-nav">
        <AddToCart book={aBook} />
      </div>
      <div className="screen">
        <Notification
          notify={notify}
          setNotify={setNotify}
        />
        <MessageDialog
          messageDialog={messageDialog}
          setMessageDialog={setMessageDialog}
        />
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

                <div className="book-screen-container">

                  <div className="container__main">
                    <TopSection className="top__section__top" book={aBook} />
                    <div className="container__left">
                      <input type="image" src={aBook.cover} title="click to enlarge" alt="book cover" className="book-cover" onClick={() => setShow(true)} />
                      <BookCoverModal title="Book Cover" onClose={() => setShow(false)} show={show}>
                        <img src={aBook.cover} alt="book cover" className="book-cover-large" />
                      </BookCoverModal>
                    </div>
                    <div className="fav-icon-text">
                      <Heart
                        favorited={favorited}
                      />
                      {favorited ?
                        <div onClick={removeFromWishlistHandler}>Remove from Wishlist</div>
                        :
                        <div onClick={addToWishlistNew}>Add to Wishlist</div>}


                    </div>

                    <hr className="hide-to-compact-before top_section_divider section_divider" />
                    <div className="container__right">
                      <TopSection
                        className="hide-to-compact"
                        book={aBook} />
                      <hr className="hide-to-compact section_divider add-to-cart-non-nav" />
                      <div className="add-to-cart-non-nav">
                        <AddToCart
                          book={aBook}
                        />
                      </div>

                      <div className="mini_section hide-to-compact">
                        <div className="book_details_heading book_details_heading_bottom">
                          Product Details
                        </div>

                        <ProductDetails />
                      </div>
                    </div>
                    <div className="accordion">
                      <Accordion
                        data={accordion_data}
                      />
                    </div>
                  </div>
                  <hr className="hide-to-compact" />
                  <div className="section hide-to-compact">
                    <div className="book_details_heading_center book_details_heading book_details_heading_bottom">Overview</div>
                    <div className="text_body overview_section"> {aBook.description}</div>
                  </div>
                  <hr className="hide-to-compact" />
                  <div className="smaller_section hide-to-compact">
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
                            <div className="overall-flex">
                              <RatingHeader
                                rating={aBook.rating}
                              />
                            </div>
                            <button
                              className="btn btn-primary btn-heading"
                              onClick={createReviewHandler}>
                              Write a review
                            </button>
                          </div>
                          <div className="overall-block">
                            <RatingHeader
                              rating={aBook.rating}
                            />
                          </div>
                          {
                            commentsLength > 0 ?
                              <div>
                                <div className="num_of_reviews">
                                  1-{commentsLength} of {commentsLength} Reviews
                                </div>
                                <hr />
                                {
                                  (aBook.comments).map((comment, i) => <div key={comment.commenter}>
                                    <div className="comment_container">
                                      <div className="text_body commenter left_commenter" ><b>{comment.commenter}</b></div>

                                      <div className="comments" key={comment.commenter}>

                                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                                        <div className="book_details_rating" id="book_details_rating">
                                          <div className="rating_stars" id="rating_stars">
                                            <Rating value={comment.rating}
                                              precision={0.1}
                                              size="small"
                                              readOnly
                                            />
                                          </div>
                                          <div className="rating_title" id="rating_title">  {comment.title}</div>
                                          <div className="text_body commenter block_commenter" id="commenter"><b>{comment.commenter}</b></div>
                                        </div>

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
    </>
  );
};

export default BookScreen;
;
