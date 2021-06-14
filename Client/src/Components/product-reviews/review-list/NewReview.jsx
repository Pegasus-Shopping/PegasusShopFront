import React, { useState } from "react";
import UploadPhotos from "./UploadPhotos";
import SelectStarRating from "./SelectStarRating";

function NewReview() {
  const [reviewTracker, setReviewTracker] = useState(0);
  const [summaryText, setSummaryText] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [nicknameText, setNicknameText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [photoArray, setPhotoArray] = useState([]);
  const [newReview, setNewReview] = useState(
    {
      review_id: 0,
      rating: 0,
      summary: "",
      recommend: false,
      response: null,
      body: "",
      date: "",
      reviewer_name: "",
      helpfulness: 0,
      photos: [],
    },
  );

  const newReviewTemplate = {
    review_id: 0,
    rating: 0,
    summary: "",
    recommend: false,
    response: null,
    body: "",
    date: "",
    reviewer_name: "",
    helpfulness: 0,
    photos: [],
  };

  function onClickNewReview() {
    if (reviewTracker === 0) {
      setReviewTracker(1);
    } else {
      const review = document.getElementById("newReviewBody");
      console.log(review);
      console.log("this is summaryText: ", summaryText);
      console.log("this is reviewText: ", reviewText);
      console.log("this is nicknameText: ", nicknameText);
      console.log("this is emailText: ", emailText);
      console.log("this is photoArray: ", photoArray);
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

  function setNewReviewTemplate(reviewId, rating, summary, recommend,
    response, body, date, reviewerName, helpfulness, photos) {
    newReview.review_id = reviewId;
    newReview.rating = rating;
    newReview.summary = summary;
    newReview.recommend = recommend;
    newReview.response = response;
    newReview.body = body;
    newReview.date = date;
    newReview.reviewer_name = reviewerName;
    newReview.helpfulness = helpfulness;
    newReview.photos = photos;
  }

  return (
    <div>
      {reviewTracker === 0 && <input type="button" value="New Review" onClick={onClickNewReview} />}
      {reviewTracker === 1 && (
      <div id="newReviewBody">
        <div id="select star rating">
          <SelectStarRating />
        </div>
        <div id="do you recommend">
          Do you Recommend the product?
          <label>
            <input type="radio" id="recommend" />
            Yes
          </label>
          <label>
            <input type="radio" />
            No
          </label>
        </div>
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
