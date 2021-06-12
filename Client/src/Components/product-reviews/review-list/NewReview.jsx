import React, { useState } from "react";
import UploadPhotos from "./UploadPhotos";

function NewReview() {
  const [reviewTracker, setReviewTracker] = useState(0);
  function onClickNewReview() {
    if (reviewTracker === 0) {
      setReviewTracker(1);
    } else {
      setReviewTracker(0);
    }
  }

  return (
    <div>
      {reviewTracker === 0 && <input type="button" value="New Review" onClick={onClickNewReview} />}
      {reviewTracker === 1 && (
      <div>
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
        <textarea rows="1" cols="100" />
        <br />
        <br />
        Review:
        <br />
        <textarea rows="10" cols="100" />
        <br />
        <UploadPhotos />
        <br />
        Nickname:
        <br />
        <input type="text" />
        <br />
        Email:
        <br />
        <input type="text" />
        <br />
        <input type="button" value="Submit" onClick={onClickNewReview} />
      </div>
      )}
    </div>
  );
}

export default NewReview;
