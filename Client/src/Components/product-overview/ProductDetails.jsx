import React, { useContext } from "react";
import DataContext from "../context";

function ProductDetails() {
  const data = useContext(DataContext);
  const { description, features } = data.product;
  return (
    <div>
      <p>{description}</p>
      <div className="productFeature">
        {features.map((feature) => (
          <span className="feature">
            {feature.feature}
            :
            {" "}
            {feature.value}
            {" "}
            <br />
          </span>
        ))}
      </div>
    </div>
  );
}

export default ProductDetails;
