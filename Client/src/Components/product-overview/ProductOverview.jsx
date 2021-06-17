import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ImageExpander from "./ImageExpander";
import ImageViewer from "./ImageViewer";
import ProductDetails from "./ProductDetails";
import ProductOptions from "./ProductOptions";
import css from "./styles.css";

function ProductOverview({ setStyleIndex, id }) {
  const [thumb, setThumb] = useState(0);
  const [expanded, toggleExpanded] = useState(false);
  useEffect(() => {
    // reset thumbnail index on product change
    setThumb(0);
  }, [id]);
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
        <ProductOptions setStyleIndex={setStyleIndex} setThumb={setThumb} />
      </div>
      <div className={css.productdetails}>
        <ProductDetails />
      </div>
    </div>
  );
}
ProductOverview.propTypes = {
  setStyleIndex: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
export default ProductOverview;
