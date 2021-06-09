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

  // Assigns variable relevantValue to each object in review list and then returns a list
  // sorted by relevantValue. relevantValue = 2 * helpfullCount - (current date - review date).
  // current date - review date is measured in days
  function createRelevant() {
    const tempList = [...listNewDateFormat];
    const date = new Date();
    const currentDateString = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    const currentDate = new Date(currentDateString);
    const relevantList = tempList.map((review) => {
      const relevantValue = 2 * review.helpfulness
        - ((currentDate.getTime() - review.date.getTime()) / (1000 * 3600 * 24));
      return { ...review, relevantValue };
    });
    return relevantList.sort((a, b) => b.relevantValue - a.relevantValue);
  }

  function onChange(event) {
    setList(event.target.value);
  }

  const relevantList = createRelevant();

  return (
    <div>
      <select id="test" onChange={onChange}>
        <option value="Latest">Latest</option>
        <option value="Most Helpful">Most Helpful</option>
        <option value="Relevant">Relevant</option>
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
        {listCounter === "Relevant" && (relevantList.map((review) => (
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
