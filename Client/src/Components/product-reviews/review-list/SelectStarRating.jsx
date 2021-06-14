import React from "react";
import css from "../styles.css";

function SelectStarRating() {
  function onStarClick() {
    console.log("was here");
  }

  return (
    <div>
      <div className={css.starsOuter} onClick={onStarClick} onKeyPress={onStarClick} role="button" tabIndex={0}>
        <span type="radio" id="inner" className={css.newReviewStarsInner} />
      </div>
    </div>
  );
}

export default SelectStarRating;
