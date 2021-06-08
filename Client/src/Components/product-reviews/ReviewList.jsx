import React from "react";
import PropTypes from "prop-types";
import Review from "./review";

// Creates a list of reviews. Maps in the list from ProductReviews to Review to create each review
function ReviewList(props) {
  const { list } = props;

  return (
    <div>
      {list.map((review) => (
        <div>
          <Review review={review} />
          <hr />
        </div>
      ))}
    </div>
  );
}

ReviewList.propTypes = {
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

export default ReviewList;
