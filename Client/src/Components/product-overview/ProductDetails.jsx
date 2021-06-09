import React from "react";
import PropTypes from "prop-types";

function ProductDetails({
  description, features,
}) {
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

ProductDetails.propTypes = {
  description: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProductDetails;
