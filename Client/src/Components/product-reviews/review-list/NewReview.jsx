import React, { useState } from "react";
import axios from "axios";
import UploadPhotos from "./UploadPhotos";
import SelectStarRating from "./SelectStarRating";
import css from "../styles.css";

// input: takes in setNewReview function that passes new review information to ReviewList
// Creates New Review data object to be passed on to server.
function NewReview() {
  const [reviewTracker, setReviewTracker] = useState(0);
  const [summaryText, setSummaryText] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [nicknameText, setNicknameText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [photoArray, setPhotoArray] = useState([]);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewRecommend, setReviewRecommend] = useState(null);
  const [newReview, setNewReview] = useState({});
  // Brings up new review input selection when New Review button is selected.
  // Closes new review input selection and passes date with setNewReview when submit is clicked
  function onClickNewReview() {
    if (reviewTracker === 0) {
      setReviewTracker(1);
    } else {
      setNewReview({
        rating_id: 0,
        rating: reviewRating,
        summary: summaryText,
        recommend: reviewRecommend,
        body: reviewText,
        date: new Date(),
        reviewer_name: nicknameText,
        helpfulness: 0,
        photos: photoArray,
      });
      axios.post("/reviews", { params: newReview })
        .then((resp) => { console.log(resp); });
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
      {reviewTracker === 0 && <input type="button" value="New Review" onClick={onClickNewReview} />}
      {reviewTracker === 1 && (
      <div id="newReviewBody">
        <div id="select star rating">
          <SelectStarRating setReviewRating={setReviewRating} />
        </div>
        <form id="do you recommend">
          Do you Recommend the product?
          <label htmlFor="recommend-radio-yes">
            <input type="radio" name="recommend" value onClick={onRecommendClick} />
            Yes
          </label>
          <label htmlFor="recommend-radio-no">
            <input type="radio" name="recommend" value={false} onClick={onRecommendClick} />
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
        <input type="button" value="Submit" onClick={onClickNewReview} />
      </div>
      )}
    </div>
  );
}

export default NewReview;
