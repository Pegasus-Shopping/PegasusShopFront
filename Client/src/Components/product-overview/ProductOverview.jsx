import React from "react";
import ImageViewer from "./ImageViewer";
import ProductDetails from "./ProductDetails";
import ProductOptions from "./ProductOptions";

const props = {
  id: 11,
  name: "Air Minis 250",
  slogan: "Full court support",
  description: "This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.",
  category: "Basketball Shoes",
  default_price: "0",
  features: [
    {
      feature: "Sole",
      value: "Rubber",
    },
    {
      feature: "Material",
      value: "FullControlSkin",
    },
  ],
};

function ProductOverview() {
  return (
    <div>
      <ImageViewer />
      <ProductOptions
        category={props.category}
        name={props.name}
        id={props.id}
        defaultPrice={props.default_price}
      />
      <ProductDetails
        description={props.description}
        features={props.features}
      />
    </div>
  );
}

export default ProductOverview;
