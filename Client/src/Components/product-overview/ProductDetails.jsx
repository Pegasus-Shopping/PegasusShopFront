import React, { useContext } from "react";
import DataContext from "../context";
import css from "./styles.css";

function ProductDetails() {
  const data = useContext(DataContext);
  const { description, features } = data.product;
  return (
    <div className={css.productdetailsgrid}>
      <p className={css.productdescription}>{description}</p>
      <div className={css.productfeature}>
        {features.map((feature) => (
          <span className="feature" key={feature.feature}>
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
