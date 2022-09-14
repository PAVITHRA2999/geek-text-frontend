import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";

const ReviewForm = ({ addReview }) => {
  const [titleInput, setTitleInput] = useState("");
  const [commenterInput, setCommenterInput] = useState("");
  const [ratingInput, setRatingInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [anonymousInput, setAnonymousInput] = useState("");

  const handleTitleChange = (e) => {
    setTitleInput(e.currentTarget.value);
  };

  const handleCommenterChange = (e) => {
    setCommenterInput(e.currentTarget.value);
  };
  const handleRatingChange = (e) => {
    setRatingInput(e.currentTarget.value);
  };
  const handleContentChange = (e) => {
    setContentInput(e.currentTarget.value);
  };
  const handleAnonymousChange = (e) => {
    setAnonymousInput(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview(
      titleInput,
      commenterInput,
      ratingInput,
      contentInput,
      anonymousInput
    );
    setTitleInput("");
    setCommenterInput("");
    setRatingInput("");
    setContentInput("");
    setAnonymousInput(false);
  };


  return (

    <form onSubmit={handleSubmit}>
      <input
        value={titleInput}
        type="text"
        onChange={handleTitleChange}
        placeholder="Enter title..."
      />
      <input
        value={commenterInput}
        type="text"
        onChange={handleCommenterChange}
        placeholder="Enter commenter..."
      />
      <Rating value={ratingInput} onChange={handleRatingChange} />
      <input
        value={contentInput}
        type="text"
        onChange={handleContentChange}
        placeholder="Enter content..."
      />
      <input
        value={anonymousInput}
        type="checkbox"
        onChange={handleAnonymousChange}
      />
      <button>Submit</button>
    </form>
  );
};

export default ReviewForm;
