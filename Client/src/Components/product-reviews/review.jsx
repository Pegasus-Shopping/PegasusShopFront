/* eslint-disable camelcase */
import React, { useState } from "react";
import PropTypes from "prop-types";
import Helpful from "./Helpful";
import RecommendProduct from "./RecommendProduct";
import StarRating from "./StarRating";
import Body from "./Body";
import Response from "./Response";

// Review function creates each individual review. Review function will call other functions to
// delegate individual features within a review.
// Each review will contain a rating, date, summary, body, helpfulness, recommend, photos, response,
// and reviewer_name
function Review({ review }) {
  const {
    rating, date, summary, body, helpfulness, recommend, photos, response, reviewer_name,
  } = review;
  const [helpfulCounter, setHelpCounter] = useState(helpfulness);
  function incrementCounter() {
    setHelpCounter(helpfulCounter + 1);
  }
  const realDate = new Date(date).toDateString().split(" ").slice(1)
    .join(" ");
  return (
    <div>
      <div id="rating">
        <StarRating rating={rating} />
      </div>
      <div id="username" align="right"> </div>
      <div id="review-details" align="right">
        {reviewer_name}
        ,
        { realDate }
      </div>
      <div id="review-summary" align="center">
        <b>
          {summary}
        </b>
      </div>
      <Body text={body} photos={photos} />
      <br />
      <Response response={response} />
      <br />
      <RecommendProduct recommend={recommend} />
      <br />
      <Helpful helpfulCounter={helpfulCounter} incrementCounter={incrementCounter} />
    </div>
  );
}

Review.propTypes = {
  review: PropTypes.shape({
    rating: PropTypes.number,
    date: PropTypes.string,
    reviewer_name: PropTypes.string,
    summary: PropTypes.string,
    body: PropTypes.string,
    helpfulness: PropTypes.number,
    recommend: PropTypes.bool,
    photos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      url: PropTypes.string,
    })).isRequired,
    response: PropTypes.string,
  }).isRequired,

};

export default Review;
