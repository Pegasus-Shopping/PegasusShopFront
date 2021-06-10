import React from "react";
import StyleSelector from "./StyleSelector";
import DataContext from "../context";

const { useContext } = React;

function ProductOptions() {
  const data = useContext(DataContext);
  const defaultPrice = data.product.default_price;
  const { styles, styleIndex } = data;
  const originalPrice = styles[styleIndex].original_price;
  const salePrice = styles[styleIndex].sale_price;
  const { category, name } = data.product;

  return (
    <div>
      <div>STAR RATING PLACEHOLDER</div>
      <span className="productCategory">{category}</span>
      <h1>{name}</h1>
      {salePrice !== "0"
        && (
        <span className="price">
          <b>{salePrice}</b>
          {" "}
          <s>{originalPrice}</s>
        </span>
        )}
      {salePrice === "0" && originalPrice !== "0"
      && <span className="price">{originalPrice}</span>}
      {salePrice === "0" && originalPrice === "0"
      && <span className="price">{defaultPrice}</span>}
      <StyleSelector />
    </div>
  );
}

export default ProductOptions;
