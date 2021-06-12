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
        <div key={feature + index.toString()} className={css.featureGrid}>
          <h3 className={`${css.thinHeading1} ${css.modalLeft}`}>{featureObj.current === true ? Checked : featureObj.current}</h3>
          <h3 className={`${css.thinHeading1} ${css.modalCenter}`}>
            {feature}
            {" "}
          </h3>
          <h3 className={`${css.thinHeading1} ${css.modalRight}`}>{featureObj.compare === true ? Checked : featureObj.compare}</h3>
        </div>
      );
    },
  );
  return (
    <div className={css.modal}>
      <div className={css.featureGrid}>
        <h3 className={`${css.thinHeading3} ${css.modalLeft}`}>COMPARING</h3>
        <h3 className={`${css.thinHeading2} ${css.modalLeft}`}>{currentProduct.name}</h3>
        <h3 className={`${css.thinHeading2} ${css.modalRight}`}>{compareProduct.name}</h3>
      </div>
      <br />
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
