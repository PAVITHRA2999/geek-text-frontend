import React, { useState, useEffect } from "react";
import ReviewList from "../../Components/Reviews/ReviewList";
import ReviewForm from "../../Components/Reviews/ReviewForm";
import { getBookDetails } from "../../Redux/actions/bookActions";
import { useSelector, useDispatch } from "react-redux";

function ReviewScreen({ match, history }) {
    const bookDetails = useSelector((state) => state.getBookDetails);
    const { loading, error, book } = bookDetails;
    const dispatch = useDispatch();
    const backToBook = () => {
        history.push(`/book/` + match.params.id);
    };

    useEffect(() => {
        if (book && (match.params.id) !== book._id) {
            dispatch(getBookDetails(match.params.id));
        }
    }, [dispatch, book, match]);

    //var comments = book.comments;
    //console.log(JSON.stringify(comments));      
    const [reviewList, setReviewList] = useState([]);

    const addReview = (
        titleInput,
        commenterInput,
        ratingInput,
        contentInput,
        anonymousInput
    ) => {
        let copy = [...reviewList];
        copy = [
            ...copy,
            {
                id: reviewList.length + 1,
                title: titleInput,
                commenter: commenterInput,
                rating: ratingInput,
                content: contentInput,
                anonymous: anonymousInput
            }
        ];
        //at this point I have to be able to push back the new data into the array
        //or moreso from the backend
        setReviewList(copy);
        console.log(JSON.stringify(copy));
    };
    return (
        <div className="ReviewScreen">
            <button onClick={backToBook}>Back to Book</button>
            <h1>Add a Review</h1>
            <ReviewForm addReview={addReview} />
            <h1>Reviews List</h1>
            <ReviewList reviewList={reviewList} />
        </div>
    );
}

export default ReviewScreen;
