import "./SavedItem.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../../Redux/actions/wishlistActions";
import Notification from "../UI/Notification";
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const SavedItem = ({ cover, description, price, rating, title, book, qty, authorName, authorId, addBackToCartHandler, removeHandler }) => {

  const dispatch = useDispatch();

  // Notification
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

  // Determine whether item is already in wishlist and handle favorite state accordingly
  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;

  const isFavorited = wishlistItems.some((item) => item.book === book);

  const [favorited, setFavorited] = useState(isFavorited);

  // Add a new item to wishilist
  const addToWishlistHandler = () => {
    dispatch(addToWishlist(book));
    setNotify({
      isOpen: true,
      message: `"${title}" was added to wishlist`,
      type: 'success',
      typeStyle: 'specific'
    });
    setFavorited(true);
  };

  // Remove item from wishilist
  const removeFromWishlistHandler = () => {
    dispatch(removeFromWishlist(book));
    setNotify({
      isOpen: true,
      message: `"${title}" was removed from your wishlist`,
      type: 'error',
      typeStyle: 'specific'
    });
    setFavorited(false);
  };



  return (
    <>
      <div className="saved-product" >
        <div className="center__image" >
          <Link to={`/book/${book}`}>
            <img src={cover} alt={title} id="container" title="view details" className="saved-small" />
          </Link>
          <div id="infoi">
            {
              favorited ?
                <FavoriteIcon className="fav" onClick={removeFromWishlistHandler}
                  sx={{ border: "1px solid #4d636a", borderRadius: "50%", padding: "3px" }} />
                :
                <FavoriteBorderIcon className="fav" onClick={addToWishlistHandler}
                  sx={{ border: "1px solid #4d636a", borderRadius: "50%", padding: "3px" }}
                />
            }
          </div>

        </div>

        <div className="product__info">

          <Link to={`/book/${book}`} className="savedItem__name">
            <p className="info__name" title={title}>{title}</p>
          </Link>

          <div className="info__description">{description}</div>
        </div>

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />


        <div className="book__rating__stars stars-saved">
          < Rating
            name="half-rating-read"
            value={rating}
            precision={0.1}
            readOnly
            size="small"
          />
        </div>



        {/* <button type="btn" onClick={() => addBackToCartHandler(book, qty)} className="btn btn-light" title="move to cart">
          Move to cart
        </button>
        <div></div>
        <button type="btn" onClick={() => removeHandler(book, title)} className="btn btn-red btn-top-margin" title="delete">
          Remove
        </button> */}

        <div className="block buttons__block">
          <button className="saveforlater_button"
            onClick={() => addBackToCartHandler(book, qty)}>
            Move to cart
          </button>
          |
          <button className="delete_button"
            onClick={() => removeHandler(book, title)}>
            <i className="fa fa-trash-o fa-lg"></i>
          </button>
        </div>

      </div>
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
    </>
  );
};

export default SavedItem;