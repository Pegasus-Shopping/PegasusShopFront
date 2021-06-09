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

  function onChange() {
    const e = document.getElementById("test");
    const selectedText = e.options[e.options.selectedIndex].text;
    setList(selectedText);
  }

  return (
    <div>
      <select id="test" onChange={onChange}>
        <option value="latest">Latest</option>
        <option value="most-helpful">Most Helpful</option>
        <option value="recommended">recommended</option>
      </select>
      <div>
        {listCounter === "Latest" && (latestList.map((review) => (
          <div>
            <Review review={review} />
            <hr />
          </div>
        )))}
      </div>
      <div>
        {listCounter === "recommended" && (listNewDateFormat.map((review) => (
          <div>
            <Review review={review} />
            <hr />
          </div>
        )))}
      </div>
      <div>
        {listCounter === "Most Helpful" && (helpfulList.map((review) => (
          <div>
            <Review review={review} />
            <hr />
          </div>
        )))}
      </div>
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
