import React from "react";
import PropTypes from "prop-types";
import css from "../styles.css";

// Creates body portion of a Review. Displays body text and photos if there are any.
function Body({ text, photos }) {
  return (
    <div>
      <p align="center">
        { text }
      </p>
      <div align="center">
        {photos.map((photo) => (
          <img className={css.image} src={photo.url} alt="" width="250" height="300" />
        ))}
      </div>
    </div>
  );
}

Body.propTypes = {
  text: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    url: PropTypes.string,
  })).isRequired,
};

export default Body;
