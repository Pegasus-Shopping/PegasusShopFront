import React, { useState } from "react";
import PropTypes from "prop-types";
import Review from "./review";

// Creates a list of reviews. Maps in the list from ProductReviews to Review to create each review
function ReviewList({ list }) {
  const [listCounter, setList] = useState("Latest");
  const listNewDateFormat = [...list];
  list.forEach((review, index) => {
    listNewDateFormat[index].date = new Date(review.date);
  });
  const helpfulList = [...listNewDateFormat].sort((a, b) => b.helpfulness - a.helpfulness);
  const latestList = [...listNewDateFormat].sort((a, b) => b.date - a.date);

  function onChange(event) {
    setList(event.target.value);
  }

  return (
    <div>
      <select id="test" onChange={onChange}>
        <option value="Latest">Latest</option>
        <option value="Most Helpful">Most Helpful</option>
        <option value="recommended">recommended</option>
      </select>
      <>
        {listCounter === "Latest" && (latestList.map((review) => (
          <>
            <Review review={review} />
            <hr />
          </>
        )))}
      </>
      <>
        {listCounter === "recommended" && (listNewDateFormat.map((review) => (
          <>
            <Review review={review} />
            <hr />
          </>
        )))}
      </>
      <>
        {listCounter === "Most Helpful" && (helpfulList.map((review) => (
          <>
            <Review review={review} />
            <hr />
          </>
        )))}
      </>
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
