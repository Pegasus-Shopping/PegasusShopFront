import React, { useState } from "react";
import PropTypes from "prop-types";
import ImageExpander from "./ImageExpander";
import ImageViewer from "./ImageViewer";
import ProductDetails from "./ProductDetails";
import ProductOptions from "./ProductOptions";
import css from "./styles.css";

function ProductOverview({ setStyleIndex }) {
  const [thumb, setThumb] = useState(0);
  const [expanded, toggleExpanded] = useState(false);
  return (
    <div className={css.productoverview}>
      {expanded
      && (
      <div className={css.imageexpander}>
        <ImageExpander thumb={thumb} setThumb={setThumb} toggleExpanded={toggleExpanded} />
      </div>
      )}
      <div className={css.imageviewer}>
        <ImageViewer thumb={thumb} setThumb={setThumb} toggleExpanded={toggleExpanded} />
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
