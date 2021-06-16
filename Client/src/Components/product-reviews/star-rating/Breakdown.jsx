import React, { useEffect } from "react";
import PropTypes from "prop-types";
import css from "../styles.css";
// Takes in ratingList, a numbers array of ratings from all reviewers, and produces
// a rating breakdown on how the reviewers rate the product. Produces a sideways bar chart
// that graphs how the reviewers rated the product.
function Breakdown({ list }) {
  let counter5Rating = 0;
  let counter4Rating = 0;
  let counter3Rating = 0;
  let counter2Rating = 0;
  let counter1Rating = 0;

  list.forEach((rating) => {
    if (rating === 5) {
      counter5Rating += 1;
    } else if (rating === 4) {
      counter4Rating += 1;
    } else if (rating === 3) {
      counter3Rating += 1;
    } else if (rating === 2) {
      counter2Rating += 1;
    } else {
      counter1Rating += 1;
    }
  });

  // converts ratingCounter into % of total ratings.
  function getPercentage(rating) {
    return (rating / list.length) * 100;
  }

  counter5Rating = getPercentage(counter5Rating);
  counter4Rating = getPercentage(counter4Rating);
  counter3Rating = getPercentage(counter3Rating);
  counter2Rating = getPercentage(counter2Rating);
  counter1Rating = getPercentage(counter1Rating);

  useEffect(() => {
    document.getElementById("5 rating bar").style.width = `${counter5Rating}%`;
    document.getElementById("4 rating bar").style.width = `${counter4Rating}%`;
    document.getElementById("3 rating bar").style.width = `${counter3Rating}%`;
    document.getElementById("2 rating bar").style.width = `${counter2Rating}%`;
    document.getElementById("1 rating bar").style.width = `${counter1Rating}%`;
  });

  return (
    <div id="ratingBreakdown">
      <div id="5 rating">
        <u>
          5 stars
        </u>
        {" "}
        <div className={css.barContainer}>
          <div id="5 rating bar" className={css.bar5} />
        </div>
      </div>
      <div id="4 rating">
        <u>
          4 stars
        </u>
        {" "}
        <div className={css.barContainer}>
          <div id="4 rating bar" className={css.bar4} />
        </div>
      </div>
      <div id="3 rating">
        <u>
          3 stars
        </u>
        {" "}
        <div className={css.barContainer}>
          <div id="3 rating bar" className={css.bar3} />
        </div>
      </div>
      <div id="2 rating">
        <u>
          2 stars
        </u>
        {" "}
        <div className={css.barContainer}>
          <div id="2 rating bar" className={css.bar2} />
        </div>
      </div>
      <div id="1 rating">
        <u>
          1 stars
        </u>
        {" "}
        <div className={css.barContainer}>
          <div id="1 rating bar" className={css.bar1} />
        </div>
      </div>
    </div>
  );
}

Breakdown.propTypes = {
  list: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Breakdown;
