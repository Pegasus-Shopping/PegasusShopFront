import React from "react";

function ProductDetails(props) {
  return (
    <div>
      <p>{props.description}</p>
      <div className="productFeature">
        {props.features.map((feature) => (
          <span className="feature">{feature.feature}: {feature.value} <br /></span>
        ))}
      </div>
    </div>
  );
}

export default ProductDetails;
