import React from "react";
import PropTypes from "prop-types";
import ImageViewer from "./ImageViewer";
import ProductDetails from "./ProductDetails";
import ProductOptions from "./ProductOptions";
import css from "./styles.css";

function ProductOverview({ setStyleIndex }) {
  return (
    <div className={css.productoverview}>
      <div className={css.imageviewer}>
        <ImageViewer />
      </div>
      <div className={css.productoptions}>
        <ProductOptions setStyleIndex={setStyleIndex} />
      </div>
      <div className={css.productdetails}>
        <ProductDetails />
      </div>
    </div>
  );
}
ProductOverview.propTypes = {
  setStyleIndex: PropTypes.func.isRequired,
};
export default ProductOverview;
