import "./ListAllBooks.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Book from "../Components/Cart/Book";
import { getBooks as listBooks } from "../Redux/actions/bookActions";
import { CircularProgress } from '@material-ui/core';

const ListAllBooks = () => {

  const dispatch = useDispatch();
  const getBooks = useSelector((state) => state.getBooks);
  const { books, loading, error } = getBooks;

  useEffect(() => {
    dispatch(listBooks());
  }, [dispatch]);


  return (
    <div className="homescreen">
      <h2 className="centered_header">Find Books!</h2>
      <div className="homescreen__products">
        {loading ? (
          <div className="circular_progress">
            <CircularProgress className="circular_progress" color="inherit" />
          </div>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          books.map((book) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default ListAllBooks;
