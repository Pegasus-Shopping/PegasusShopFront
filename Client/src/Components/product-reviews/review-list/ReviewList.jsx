import React, { useState } from "react";
import PropTypes from "prop-types";
import Review from "./review";
import NewReview from "./NewReview";
import css from "../styles.css";
import RecordClicks from "../../RecordClicks";

// Creates a list of reviews. Maps in the list from ProductReviews to Review to create each review
function ReviewList({ list }) {
  const [listCounter, setList] = useState("Latest");
  const [counterShow, setCounterShow] = useState(2);
  const listNewDateFormat = [...list];
  list.forEach((review, index) => {
    listNewDateFormat[index].date = new Date(review.date);
  });
  const helpfulList = [...listNewDateFormat].sort((a, b) => b.helpfulness - a.helpfulness);
  const latestList = [...listNewDateFormat].sort((a, b) => b.date - a.date);

  // Assigns variable relevantValue to each object in review list and then returns a list
  // sorted by relevantValue. relevantValue = 2 * helpfulCount - (current date - review date).
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

  function onMoreReview() {
    if (counterShow < latestList.length) {
      setCounterShow(counterShow + 2);
    }
  }

  function onChange(event) {
    setCounterShow(2);
    setList(event.target.value);
  }

  const relevantList = createRelevant();

  return (
    <div id="full review section">
      {latestList.length === 0 && (
        <div>
          There are no reviews at this time. Be the first to write a new Review!
        </div>
      )}
      {latestList.length !== 0 && (
      <div className={css.reviewList}>
        <select id="select sort order" onChange={onChange}>
          <option value="Latest">Latest</option>
          <option value="Most Helpful">Most Helpful</option>
          <option value="Relevant">Relevant</option>
        </select>
        <>
          {listCounter === "Latest" && (latestList.map((review, index) => {
            if (index < counterShow) {
              return (
                <>
                  <Review review={review} />
                  <hr />
                </>
              );
            }
            return null;
          }))}

        </>
        <>
          {listCounter === "Relevant" && (relevantList.map((review, index) => {
            if (index < counterShow) {
              return (
                <>
                  <Review review={review} />
                  <hr />
                </>
              );
            }
            return null;
          }))}
        </>
        <>
          {listCounter === "Most Helpful" && (helpfulList.map((review, index) => {
            if (index < counterShow) {
              return (
                <>
                  <Review review={review} />
                  <hr />
                </>
              );
            }
            return null;
          }))}
        </>
      </div>
      ) }
      {counterShow < latestList.length && (
        <div id="see more reviews">
          <RecordClicks widget="product reviews" element="More Review Button">
            <input type="button" className={css.reviewButton} value="More Review" onClick={onMoreReview} />
          </RecordClicks>
        </div>
      )}
      <div id="new review">
        <NewReview className={css.buttonAlign} />
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
