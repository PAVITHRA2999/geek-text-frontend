import "./BookScreen.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from '@material-ui/core';
import { getBooksByAuthor } from '../Redux/actions/authorActions';
import Book from '../Components/Cart/Book';
import "./ListAllBooks.css"

const AuthorBooksScreen = ({ match }) => {
  
  const dispatch = useDispatch();
  const authorBooks = useSelector((state) => state.getBooksByAuthor);
  const { loading, error, booksByAuthor } = authorBooks;
  
  useEffect(() => {
      dispatch(getBooksByAuthor(match.params.id));
  }, [dispatch, match.params.id]);
  
  return (
    <div className="homescreen">
      <h2 className="homescreen__title">Other books by same author</h2>

      {loading ? (
        <CircularProgress className="circular_progress_dtl" />
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <div className="homescreen__products">
          {(booksByAuthor.books) ?
            (booksByAuthor.books).map(book =>
              <Book
                key={book._id}
                title={book.title}
                price={book.price}
                rating={book.rating}
                cover={book.cover}
                bookId={book._id}
                authorId={book.author}
                authorName={book.authorName}
              />
            )
            :
            <p>No books records for this author</p>}
        </div>)
      }

    </div>
  );
}

export default AuthorBooksScreen;