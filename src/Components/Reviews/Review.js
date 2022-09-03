import React from "react";
import Rating from "@material-ui/lab/Rating";

const Review = ({ review }) => {
  return (
    <div>
      <h4>{review.title}</h4>
      <p>{review.commenter}</p>
      <Rating value={review.rating} readOnly />
      <p>{review.content}</p>
      <p>{review.anonymous}</p>
    </div>
  );
};

export default Review;
