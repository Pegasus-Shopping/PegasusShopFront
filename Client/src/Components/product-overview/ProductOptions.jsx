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
  const price = () => {
    if (salePrice !== "0") {
      return (
        <span className="price">
          <b>{salePrice}</b>
          {" "}
          <s>{originalPrice}</s>
        </span>
      );
    } if (originalPrice !== "0") {
      return (<span className="price">{originalPrice}</span>);
    }
    return (<span className="price">{defaultPrice}</span>);
  };
  const { category, name } = data.product;

  return (
    <div>
      <div>STAR RATING PLACEHOLDER</div>
      <span className="productCategory">{category}</span>
      <h1>{name}</h1>
      {price()}
      <StyleSelector
        styleIndex={styleIndex}
      />
    </div>
  );
}

export default ProductOptions;
