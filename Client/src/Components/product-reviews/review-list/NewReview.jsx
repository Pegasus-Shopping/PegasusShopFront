import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import UploadPhotos from "./UploadPhotos";
import SelectStarRating from "./SelectStarRating";
import css from "../styles.css";
import RecordClicks from "../../RecordClicks";

// input: takes in setNewReview function that passes new review information to ReviewList
// Creates New Review data object to be passed on to server.
function NewReview({ id }) {
  const [reviewTracker, setReviewTracker] = useState(0);
  const [summaryText, setSummaryText] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [nicknameText, setNicknameText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [photoArray, setPhotoArray] = useState([]);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewRecommend, setReviewRecommend] = useState(null);
  /* const [newReview, setNewReview] = useState({
    rating_id: 0,
    rating: reviewRating,
    summary: summaryText,
    recommend: reviewRecommend,
    body: reviewText,
    date: new Date(),
    reviewer_name: nicknameText,
    helpfulness: 0,
    photos: photoArray,
  }); */
  // Brings up new review input selection when New Review button is selected.
  // Closes new review input selection and passes date with setNewReview when submit is clicked
  function onClickNewReview() {
    if (reviewTracker === 0) {
      setReviewTracker(1);
    } else {
      const newReview = {
        product_id: id,
        rating: parseInt(reviewRating),
        summary: summaryText,
        recommend: reviewRecommend,
        body: reviewText,
        name: nicknameText,
        photos: photoArray,
        email: emailText,
        characteristics: {},
      };
      console.log("this is newReview: ", newReview);
      axios.post("/reviews", { params: { newReview } })
        .then(() => axios.get("/reviews", { params: { product_id: id } })
          .then((resp) => console.log(resp.data.results))
          .catch((err) => console.log(err)))
        .catch((err) => console.log(err));

      setReviewTracker(0);
    }
  }

  function onSummaryChange(event) {
    setSummaryText(event.target.value);
  }

  function onReviewChange(event) {
    setReviewText(event.target.value);
  }

  function onNicknameChange(event) {
    setNicknameText(event.target.value);
  }

  function onEmailChange(event) {
    setEmailText(event.target.value);
  }

  function onRecommendClick(event) {
    if (event.target.value) {
      setReviewRecommend(true);
    } else {
      setReviewRecommend(false);
    }
  }

  return (
    <div>
      {reviewTracker === 0 && (
      <RecordClicks widget="product reviews" element="New Review button">
        <input type="button" value="New Review" onClick={onClickNewReview} className={css.reviewButton} />
      </RecordClicks>
      )}
      {reviewTracker === 1 && (
        <>
          <div id="newReviewBody" className={css.newReview}>
            <RecordClicks widget="product reviews" element="select star rating">
              <div id="select star rating">
                <SelectStarRating setReviewRating={setReviewRating} />
              </div>
            </RecordClicks>

            <form id="do you recommend">
              Do you Recommend the product?
              <label htmlFor="recommend-radio-yes">
                <RecordClicks widget="product reviews" element="yes recommend">
                  <input type="radio" name="recommend" value onClick={onRecommendClick} />
                </RecordClicks>
                Yes
              </label>
              <label htmlFor="recommend-radio-no">
                <RecordClicks widget="product reviews" element="no recommend">
                  <input type="radio" name="recommend" value={false} onClick={onRecommendClick} />
                </RecordClicks>
                No
              </label>
            </form>
            <br />
            Summary:
            <br />
            <textarea rows="1" cols="100" onChange={onSummaryChange} />
            <br />
            <br />
            Review:
            <br />
            <textarea rows="10" cols="100" onChange={onReviewChange} />
            <br />
            <UploadPhotos setPhoto={setPhotoArray} />
            <br />
            Nickname:
            <br />
            <input type="text" onChange={onNicknameChange} />
            <br />
            Email:
            <br />
            <input type="text" onChange={onEmailChange} />
            <br />
          </div>
          <RecordClicks widget="product review" element="submit new review button">
            <input type="button" value="Submit" onClick={onClickNewReview} />
          </RecordClicks>
        </>
      )}
    </div>
  );
}

NewReview.propTypes = {
  id: PropTypes.number.isRequired,
};

export default NewReview;
