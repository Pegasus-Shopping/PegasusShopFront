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
  const [displayStarCounter, setDisplayStarCounter] = useState(0);
  useEffect(() => {
    axios.get("/reviews", { params: { product_id: id } })
      .then((resp) => setReviewList(resp.data.results))
      .catch((err) => console.log(err));
  }, [id, displayStarCounter]);

  console.log(id);

  return (
    <div className={css.reviewListandStarBreakdown}>
      <StarRatingBreakdown
        list={reviewList}
        id={id}
        setDisplayStarCounter={setDisplayStarCounter}
      />
      <ReviewList list={reviewList} id={id} displayStarCounter={displayStarCounter} />
    </div>
  );
}

ProductReviews.propTypes = {
  id: PropTypes.number.isRequired,
};

export default ProductReviews;
