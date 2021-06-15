import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import PropTypes from "prop-types";
import css from "../styles.css";

function SelectStarRating({ setReviewRating }) {
  const starMapper = [...new Array(5)];
  const [rating, setRating] = useState(null);
  function onStarClick(event) {
    setRating(event.target.value);
    setReviewRating(event.target.value);
  }

  return (
    <div>
      <div>
        {starMapper.map((star, index) => {
          const ratingValue = index + 1;
          return (
            <label>
              <input type="radio" name="rating" value={ratingValue} className={css.formRadio} onClick={onStarClick} />
              <FaStar className="star" color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"} size={15} />
            </label>
          );
        })}
      </div>
    </div>
  );
}

SelectStarRating.propTypes = {
  setReviewRating: PropTypes.func.isRequired,
};

export default SelectStarRating;
