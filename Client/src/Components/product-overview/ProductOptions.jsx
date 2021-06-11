import React from "react";
import StarRating from "../product-reviews/StarRating";
import StyleSelector from "./StyleSelector";
import DataContext from "../context";
import css from "./styles.css";

const { useContext } = React;

function ProductOptions() {
  const data = useContext(DataContext);
  const defaultPrice = data.product.default_price;
  const { styles, styleIndex } = data;
  const originalPrice = styles[styleIndex].original_price;
  const salePrice = styles[styleIndex].sale_price;
  const { category, name } = data.product;

  return (
    <div className={css.options}>
      <StarRating rating={4} className={css.starrating} />
      <span className={css.categoryheader}>{category}</span>
      <h1 className={css.nameheader}>{name}</h1>
      {salePrice !== "0"
        && (
        <span className={css.price}>
          <b>{"$" + salePrice}</b>
          {" "}
          <s>{"$" + originalPrice}</s>
        </span>
        )}
      {salePrice === "0" && originalPrice !== "0"
      && <span className={css.price}>{"$" + originalPrice}</span>}
      {salePrice === "0" && originalPrice === "0"
      && <span className={css.price}>{"$" + defaultPrice}</span>}
      <div className={css.styleselector}>
        <StyleSelector  />
      </div>
    </div>
  );
}

export default ProductOptions;
