import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import ReviewList from "./review-list/ReviewList";
import StarRatingBreakdown from "./star-rating/StarRatingBreakdown";
import css from "./styles.css";
// Passes in an example review list pulled from altiere API.
// ProductReviews pass in the list to ReviewList.
function ProductReviews({ id }) {
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    axios.get("/reviews", { params: { product_id: id } })
      .then((resp) => setReviewList(resp.data.results))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className={css.reviewListandStarBreakdown}>
      <StarRatingBreakdown list={reviewList} id={id} />
      <ReviewList list={reviewList} />
    </div>
  );
}

ProductReviews.propTypes = {
  id: PropTypes.number.isRequired,
};

export default ProductReviews;
