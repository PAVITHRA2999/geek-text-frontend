import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import Notification from '../Cart/UI/Notification';
import axios from 'axios';
import { useParams } from "react-router";

const ReviewForm = ({ numComments, oldRating, bookTitle, closeModal }) => {
  const [titleInput, setTitleInput] = useState("");
  const [commenterInput, setCommenterInput] = useState("");
  const [ratingInput, setRatingInput] = useState(0);
  const [contentInput, setContentInput] = useState("");

  const { id } = useParams();

  const handleRatingChange = (e) => {
    setRatingInput(Number(e.target.value));
  };
  const handleChange = (e) => {
    switch (e.target.id) {
      case 'rating-commenter':
        setCommenterInput(e.target.value);
        break;
      case 'rating-content':
        setContentInput(e.target.value);
        break;
      case 'rating-title':
        setTitleInput(e.target.value);
        break;
      default:
        break;
    }
  };

  const BlankValidation = () => {
    if (
      !titleInput ||
      !commenterInput ||
      !ratingInput ||
      !contentInput
    ) {
      throw 'All fields are required';
    }
  };
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
    typeStyle: '',
  });

  const errorHandler = (message) => {
    setNotify({
      isOpen: true,
      message: message || 'Sorry, there was an error. Plase try again later.',
      type: 'error',
      typeStyle: '',
    });
  };


  const submitReview = () => {
    closeModal();
    window.location.reload();
  };

  // Update sold count of book and stop displaying it in cart
  const UpdateInfo = (e) => {
    e.preventDefault();
    try {
      BlankValidation();
      const baseURL = {
        dev: 'http://localhost:5000/books/review/',
        prod: 'http://lea-geek-text.herokuapp.com/books/review/',
      };
      const url =
        process.env.NODE_ENV === 'production' ? baseURL.prod : baseURL.dev;

      const newAverage = ((numComments * oldRating) + ratingInput) / (numComments + 1);
      const token = localStorage.getItem('token');
      axios.put(`${url}${id}`, {

        headers: {
          'x-auth-token': token,
        },

        commenter: commenterInput,
        title: titleInput,
        content: contentInput,
        rating: ratingInput,
        average: newAverage,
      });
      submitReview();
    }
    catch (e) {
      errorHandler(
        e ? e : 'Something unexpected happened. Please try again later'
      );
      return;
    }
  };



  return (
    <div className='profile-form'>
      <div className='col-1-2'>
        <form className='account__form'>
          <h3 className='account__form-header'>Your Review for "{bookTitle}"</h3>



          <div className='form-control'>
            <label>Your Rating*</label>
          </div>
          <div className="rating-stars">
            <Rating value={ratingInput} onChange={handleRatingChange} name={id} size="large" />
          </div>

          <div className='form-control'>
            <label>Title*</label>
            <input
              id="rating-title"
              value={titleInput}
              type="text"
              onChange={handleChange}
              placeholder="Great Read!"
            />
          </div>


          <div className='form-control'>
            <label>Review*</label>
            <textarea
              className="review-textarea"
              // style={{
              //   width: "100%",
              //   height: "150px",
              //   padding: "14px",
              //   fontFamily: "inherit",
              //   boxSizing: "border-box",
              //   border: "1px solid #ddd",
              //   borderRadius: "0px",
              //   touchAction: "inherit",
              //   onFocus: "none",
              //   fontSize: "16px",
              //   resize: "none"
              // }}
              id="rating-content"
              value={contentInput}
              onChange={handleChange}
              placeholder="Tell others what you thought!"
            />
          </div>

          <div className='form-control'>
            <label >Username (others will see this)*</label>
            <input
              id="rating-commenter"
              value={commenterInput}
              type="text"
              onChange={handleChange}
              placeholder="ChocolateMuffin3"
            />
          </div>



          <div className='account__forgotpassword-buttons'>
            <button
              type='submit'
              onClick={UpdateInfo}
              className='btn btn-primary auth'
            >
              Post Review
            </button>
            <button onClick={closeModal} className='btn btn-light auth'>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>


  );
};

export default ReviewForm;
