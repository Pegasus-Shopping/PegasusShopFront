import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Review from "./review";
import NewReview from "./NewReview";
import css from "../styles.css";
import RecordClicks from "../../RecordClicks";
import config from "../../../../../config";
// Creates a list of reviews. Maps in the list from ProductReviews to Review to create each review
function ReviewList({ list, id, displayStarCounter }) {
  const [listCounter, setList] = useState("Latest");
  const [counterShow, setCounterShow] = useState(2);
  const [relevantList, setRelevantList] = useState([]);
  const [helpfulList, setHelpfulList] = useState([]);
  const [latestList, setLatestList] = useState([]);
  const listNewDateFormat = [...list];
  list.forEach((review, index) => {
    listNewDateFormat[index].date = new Date(review.date);
  });

  // Gets data by calling API and if displayStarCounter is not 0, it will only pull the rating with
  // ratings equal to displayStarCounter.
  function getData() {
    axios.get("https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/reviews", {
      params: { product_id: id, sort: "relevant" },
      headers: {
        Authorization: `${config.TOKEN}`,
      },
    })
      .then((resp) => {
        if (displayStarCounter === 0) {
          setRelevantList(resp.data.results);
        } else {
          const relevantFilterList = [];
          resp.data.results.forEach((review) => {
            if (review.rating === displayStarCounter) {
              relevantFilterList.push(review);
            }
          });
          setRelevantList(relevantFilterList);
        }
      });
    axios.get("https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/reviews", {
      params: { product_id: id, sort: "newest" },
      headers: {
        Authorization: `${config.TOKEN}`,
      },
    })
      .then((resp) => {
        if (displayStarCounter === 0) {
          setLatestList(resp.data.results);
        } else {
          const latestFilterList = [];
          resp.data.results.forEach((review) => {
            if (review.rating === displayStarCounter) {
              latestFilterList.push(review);
            }
          });
          setLatestList(latestFilterList);
        }
      });
    axios.get("https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/reviews", {
      params: { product_id: id, sort: "helpful" },
      headers: {
        Authorization: `${config.TOKEN}`,
      },
    })
      .then((resp) => {
        if (displayStarCounter === 0) {
          setHelpfulList(resp.data.results);
        } else {
          const helpfulFilterList = [];
          resp.data.results.forEach((review) => {
            if (review.rating === displayStarCounter) {
              helpfulFilterList.push(review);
            }
          });
          setHelpfulList(helpfulFilterList);
        }
      });
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

  useEffect(() => {
    setCounterShow(2);
    getData();
  }, [id, displayStarCounter]);

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
                <div key={review.review_id}>
                  <Review review={review} />
                  <br />
                </div>
              );
            }
            return null;
          }))}

        </>
        <>
          {listCounter === "Relevant" && (relevantList.map((review, index) => {
            if (index < counterShow) {
              return (
                <div key={review.review_id}>
                  <Review review={review} />
                  <br />
                </div>
              );
            }
            return null;
          }))}
        </>
        <>
          {listCounter === "Most Helpful" && (helpfulList.map((review, index) => {
            if (index < counterShow) {
              return (
                <div key={review.review_id}>
                  <Review review={review} />
                  <br />
                </div>
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
        <NewReview id={id} />
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
  id: PropTypes.number.isRequired,
  displayStarCounter: PropTypes.number.isRequired,
};

export default ReviewList;
