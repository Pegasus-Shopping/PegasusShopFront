import React from "react";
import ImageViewer from "./ImageViewer";
import ProductDetails from "./ProductDetails";
import ProductOptions from "./ProductOptions";
import StyleSelector from "./StyleSelector";

const product = {
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

// const product = axios.patch("https://localhost:3000/patch:");

function ProductOverview() {
  return (
    <div>
      <ImageViewer />
      <ProductOptions
        category={product.category}
        name={product.name}
        id={product.id}
        defaultPrice={product.default_price}
      />
      <StyleSelector />
      <ProductDetails
        description={product.description}
        features={product.features}
      />
    </div>
  );
}

export default ProductOverview;
