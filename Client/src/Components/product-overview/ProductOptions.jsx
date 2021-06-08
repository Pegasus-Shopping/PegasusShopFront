import React from "react";
import StyleSelector from "./StyleSelector";

function ProductOptions(props) {
  return (
    <div>
      <div>STAR RATING PLACEHOLDER</div>
      <span className="productCategory">{props.category}</span>
      <h1>{props.name}</h1>
      <StyleSelector
        defaultPrice={props.defaultPrice}
        id={props.id}
      />
    </div>
  );
}

export default ProductOptions;
