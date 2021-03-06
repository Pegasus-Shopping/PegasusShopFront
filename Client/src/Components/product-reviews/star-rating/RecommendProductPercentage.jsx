import React from "react";
import PropTypes from "prop-types";
import css from "../styles.css";

// Takes in recommendList, a boolean array where true means the reviewer recommends the product
// and false if the reviewer does not recommend the product. It returns the statement:
// "X% of reviews recommend this product."
function RecommendProductPercentage({ list }) {
  // countPercentage calculates the percentage of trues in recommendList.
  function countPercentage() {
    let recommendCount = 0;
    if (list.length === 0) {
      return 0;
    }
    list.forEach((recommend) => {
      if (recommend) {
        recommendCount += 1;
      }
    });
    return (recommendCount / list.length) * 100;
  }

  const recommendPercentage = countPercentage();

  return (
    <div>
      <div className={css.recommendProductPercentage}>
        {`${recommendPercentage}% of reviews recommend this product`}
      </div>
    </div>
  );
}

RecommendProductPercentage.propTypes = {
  list: PropTypes.arrayOf(PropTypes.bool).isRequired,
};

export default RecommendProductPercentage;
