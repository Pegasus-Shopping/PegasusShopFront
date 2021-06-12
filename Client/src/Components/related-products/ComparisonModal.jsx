import React from "react";
import PropTypes from "prop-types";
import css from "./styles.css";
import helper from "./helper-functions";

const { createFeatureArray } = helper;
// input: type: objects, content: object of a product with a features property
// output: modal comparing features of two products
// side effects: none
function ComparisonModal({ currentProduct, compareProduct }) {
  const Comparisons = createFeatureArray(currentProduct, compareProduct).map(
    (featureObj, index) => {
      const { feature } = featureObj;
      const Checked = <i className="fa fa-check" aria-hidden="true" />;
      return (
        <div key={feature + index.toString()} className={`${css.featureFlexbox} + ${css.thinHeading1}`}>
          <span>{featureObj.current === true ? Checked : featureObj.current}</span>
          <span>
            {feature}
            {" "}
          </span>
          <span>{featureObj.compare === true ? Checked : featureObj.compare}</span>
        </div>
      );
    },
  );
  return (
    <div className={css.modal}>
      <h3 className={css.thinHeading3}>Comparing</h3>
      <div className={css.featureFlexbox}>
        <h3 className={css.thinHeading2}>{currentProduct.name}</h3>
        <h3 className={css.thinHeading2}>{compareProduct.name}</h3>
      </div>
      <div className={css.featureGrid} />
      {Comparisons}
    </div>
  );
}

ComparisonModal.propTypes = {
  currentProduct: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.string,
    imgUrl: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
  compareProduct: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.string,
    imgUrl: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
};

export default ComparisonModal;
