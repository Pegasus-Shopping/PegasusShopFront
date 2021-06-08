import React from "react";
import PropTypes from "prop-types";
import css from "./styles.css";

// RecommendProduct takes in reccommend which is a boolean true/false.
// If true, it will display a message saying the reviewer recommends the product.
// If false, it will return false.
function RecommendProduct(props) {
  const { recommend } = props;
  if (recommend) {
    return (
      <div>
        <span className={css.checkmark}>
          <div className={css.checkmark_stem} />
          <div className={css.checkmark_kick} />
        </span>
        I recommend the Product
      </div>
    );
  }
  return null;
}

RecommendProduct.propTypes = {
  recommend: PropTypes.bool.isRequired,
};

export default RecommendProduct;
