import React from "react";
import PropTypes from "prop-types";
import StyleSelector from "./StyleSelector";

function ProductOptions({
  category, name, price, styleIndex,
}) {
  return (
    <div>
      <div>STAR RATING PLACEHOLDER</div>
      <span className="productCategory">{category}</span>
      <h1>{name}</h1>
      {price()}
      <StyleSelector
        styleIndex={styleIndex}
      />
    </div>
  );
}
ProductOptions.propTypes = {
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  // price: PropTypes.ed,
  styleIndex: PropTypes.number.isRequired,
};
export default ProductOptions;
