import "./CartItem.css";
import { Link } from "react-router-dom";
import Rating from '@material-ui/lab/Rating';
import QtyDropdown from "../QtyDropdown/QtyDropdown";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const CartItem = ({ item, qtyChangeHandler, removeHandler, addToWishlistHandler, saveForLaterHandler, addBackToCartHandler, saved, bookId }) => {

  return (
    <div>
      {saved === false ? (
        <div className="item">
          <div id="grid_Cart">

            <div id="cover_Column">
              <Link to={`/book/${bookId}`}>
                <img src={item.cover} alt={item.title} className="small" />
              </Link>
            </div>

            <div id="info_Column" className="info">
              <div>
                <Link to={`/book/${bookId}`} className="cartItem__name">
                  {item.title}
                </Link>
              </div>
              <div className="cartItem___author">
                By <Link to={`/authorbooks/${item.author._id}`} className="cartItem__author__link">{item.authorName}</Link>
              </div>

              <div className="block block rating__block">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
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
              <div>
                <div className="block buttons__block">
                  <button className="saveforlater_button"
                    onClick={() => saveForLaterHandler(item.book, item.qty)}>
                    Save for later
                  </button>
                  |
                  <FavoriteBorderIcon
                    className="fav_button"
                    style={{ fontSize: "18px" }}
                    color="inherit"
                    size="sm"
                    onClick={() => addToWishlistHandler(item.book, item.title)}
                  />
                  |
                  <button className="delete_button"
                    onClick={() => removeHandler(item.book, item.title)}>
                    <i className="fa fa-trash-o fa-lg"></i>
                  </button>
                </div>
              </div>
            </div>


            <QtyDropdown
              item={item}
              qtyChangeHandler={qtyChangeHandler}
            />
            <div id="price_Column"
              className="cartitem__price">${parseFloat(item.price).toFixed(2)}
            </div>
          </div>

        </div>

      ) : (

        <div id="grid_SavedForLater">

          <div id="cover_Column">
            <Link to={`/book/${bookId}`}>
              <img src={item.cover} alt={item.title} className="small" />
            </Link>
          </div>
          <div id="info_Column">
            <Link to={`/book/${bookId}`} className="cartItem__name">
              {item.title}
            </Link>
            <div className="cartItem___author">
              By <Link to={`/authorbooks/${item.author._id}`} className="cartItem__author__link">{item.authorName}</Link>
            </div>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

            <div className="block rating__block">
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
            <div className="cartitem__price_saved">${parseFloat(item.price).toFixed(2)}</div>
            <div className="block buttons__block">
              <button className="saveforlater_button"
                onClick={() => addBackToCartHandler(item.book, item.qty)}>
                Add back to cart
              </button>
              |
              <FavoriteBorderIcon
                className="fav_button"
                style={{ fontSize: "18px" }}
                color="inherit"
                size="sm"
                onClick={() => addToWishlistHandler(item.book, item.title)} />
              |
              <button className="delete_button"
                onClick={() => removeHandler(item.book, item.title)}>
                <i className="fa fa-trash-o fa-lg"></i>
              </button>
            </div>
          </div>
        </div>
      )
      }
    </div>
  );
};

export default CartItem;