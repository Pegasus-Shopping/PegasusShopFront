import React from "react";
import ImageViewer from "./ImageViewer";
import ProductDetails from "./ProductDetails";
import ProductOptions from "./ProductOptions";

function ProductOverview() {
  return (
    <div>
      <ImageViewer />
      <ProductOptions />
      <ProductDetails />
    </div>
  );
}
export default ProductOverview;
