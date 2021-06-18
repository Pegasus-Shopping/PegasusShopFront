import React from "react";
import PropTypes from "prop-types";
import StarList from "./StarList";
import RecommendProductPercentage from "./RecommendProductPercentage";
import Breakdown from "./Breakdown";

// Passes in list from ProductReview.jsx and creates ratingList, an numbers array of star ratings
// given by all reviewers and recommendList, an boolean array whether or not reviewers recommend
// the product. It then sends ratingList and recommendList as inputs to the proper functions to
// render the Ratings section of Rating and Reviews.
function StarRatingBreakdown({ list }) {
  const ratingList = [];
  const recommendList = [];

  list.forEach((review) => {
    ratingList.push(review.rating);
    recommendList.push(review.recommend);
  });

  return (
    <div>
      <StarList list={ratingList} showAverage />
      <RecommendProductPercentage list={recommendList} />
      <Breakdown list={ratingList} />
    </div>
  );
}

StarRatingBreakdown.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    rating: PropTypes.number,
    date: PropTypes.string,
    reviewer_name: PropTypes.string,
    summary: PropTypes.string,
    body: PropTypes.string,
    helpfulness: PropTypes.number,
    recommend: PropTypes.bool,
    photos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
    })).isRequired,
    response: PropTypes.string,
  })).isRequired,
};

export default StarRatingBreakdown;
