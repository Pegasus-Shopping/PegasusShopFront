import React from "react";

function ProductOptions(props) {
  return (
    <div>
      <div>STAR RATING PLACEHOLDER</div>
      <span className="productCategory">{props.category}</span>
      <h1>{props.name}</h1>
      <span>PRICE PLACEHOLDER</span>
    </div>
  );
}

export default ProductOptions;
