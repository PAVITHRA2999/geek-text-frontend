import React from "react";
import Review from "./Review";

const ReviewList = ({ reviewList }) => {
  return (
    <div>
      {reviewList.map((review) => {
        return <Review review={review} />;
      })}
    </div>
  );
};
export default ReviewList;
