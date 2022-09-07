import "./WishlistItem.css";
import { Link } from "react-router-dom";
import Rating from '@material-ui/lab/Rating';

const WishlistItem = ({ item, removeHandler, addToCartHandler, bookId, moveToWishlistHandler }) => {

  return (
    <div>
      <div id="grid_wishlist">

        <div id="cover_column_wishlist">
          <Link to={`/book/${bookId}`}>
            <img src={item.cover} alt={item.title} className="small" />
          </Link>
        </div>


        <div id="info_column_wishlist">
          <Link to={`/book/${bookId}`} className="cartItem__name">
            {item.title}
          </Link>
          <div className="cartItem___author">
            By <Link to={`/authorbooks/${item.author._id}`} className="cartItem__author__link">{item.authorName}</Link>
          </div>

          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

          <div className="rating__block">
            <div className="book__rating__stars">
              < Rating
                name="half-rating-read"
                value={item.rating}
                precision={0.1}
                readOnly
                size="small"
              />
            </div>
            <div className="book__rating">{parseFloat(item.rating).toFixed(1)}</div>
          </div>

          < br />

          <div className="wishlistitem__price">
            ${parseFloat(item.price).toFixed(2)}
          </div>


        </div>
        <div className="addtocart_button">
          <button className="btn btn-primary"
            onClick={() => addToCartHandler(bookId)}>
            ADD TO CART
          </button>
        </div>
        <div id="buttons_column_wishlist">
          <div className="wishlist_delete_align">
            <button className="cartItem__deleteBtn"
              onClick={() => removeHandler(item.book, item.title)}
            >
              <i className="fa fa-trash fa-2x"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;