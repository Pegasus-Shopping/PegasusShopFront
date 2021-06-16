import React, { useEffect } from "react";
import PropTypes from "prop-types";
import css from "../styles.css";

// StarList takes in ratingList which is an array of the ratings given by all reviewers.
// It then produces the average rating of all reviews and gives a visual represention as
// partially and completly filled stars.
// (Ex. If the average rating is 4.5/5, then 4.5 stars out of 5 stars will be colored in)
function StarList({ list, showAverage }) {
  // Returns the average of input list.
  function averageRating() {
    let average = 0;
    list.forEach((rating) => {
      average += rating;
    });

    average /= list.length;
    return average;
  }

  const average = averageRating();
  const starCount = ((Math.round(average * 4) / 4) / 5) * 100;

  useEffect(() => {
    document.getElementById("inner").style.width = `${starCount}%`;
  });
  return (
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      {showAverage && (
      <span>
        {average}
      </span>
      )}
      <div className={css.starsOuter}>
        <div id="inner" className={css.starsInner} />
      </div>
    </div>
  );
}

StarList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.number).isRequired,
  showAverage: PropTypes.bool.isRequired,
};

export default StarList;
