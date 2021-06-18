import React from "react";
import PropTypes from "prop-types";
import css from "../styles.css";

// StarRating takes in rating from props.rating which is a number that is the number of stars
// a revieer gives to a product. StarRating then returns colored in stars for number of
// ratings given and empty stars for (5-rating).
function StarRating({ rating }) {
  const emptyRating = 5 - rating;
  const filledStars = new Array(rating).fill(1);
  const emptyStars = new Array(emptyRating).fill(0);

  return (
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      {filledStars.map(() => (
        <i className="fa fa-star orange-color" />
      ))}
      {emptyStars.map(() => (
        <span className="fa fa-star-o" />
      ))}
    </div>
  );
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarRating;
