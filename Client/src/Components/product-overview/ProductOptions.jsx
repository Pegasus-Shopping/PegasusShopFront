import React from "react";
import PropTypes from "prop-types";
import StarList from "../product-reviews/star-rating/StarList";
import StyleSelector from "./StyleSelector";
import DataContext from "../context";
import css from "./styles.css";

const { useContext } = React;

function ProductOptions({ setStyleIndex, setThumb }) {
  const data = useContext(DataContext);
  const defaultPrice = data.product.default_price;
  const { styles, styleIndex, rating } = data;
  const originalPrice = styles[styleIndex].original_price;
  const salePrice = styles[styleIndex].sale_price;
  const { category, name } = data.product;
  const ratings = [];
  Object.keys(rating).forEach((key) => {
    for (let i = 0; i < rating[key]; i += 1) {
      ratings.push(Number(key));
    }
  });
  return (
    <div className={css.options}>
      <div className={css.starrating}>
        <StarList showAverage={false} list={ratings} />
      </div>
      <span className={css.categoryheader}>{category}</span>
      <h1 className={css.nameheader}>{name}</h1>
      {(salePrice !== null && salePrice !== "0")
        && (
        <span className={css.price}>
          <b>{`$${salePrice}`}</b>
          {" "}
          <s>{`$${originalPrice}`}</s>
        </span>
        )}
      {(salePrice === "0" || salePrice === null) && originalPrice !== "0"
      && <span className={css.price}>{`$${originalPrice}`}</span>}
      {(salePrice === "0" || salePrice === null) && originalPrice === "0"
      && <span className={css.price}>{`$${defaultPrice}`}</span>}
      <div className={css.styleselector}>
        <StyleSelector setStyleIndex={setStyleIndex} setThumb={setThumb} />
      </div>
    </div>
  );
}
ProductOptions.propTypes = {
  setStyleIndex: PropTypes.func.isRequired,
  setThumb: PropTypes.func.isRequired,
};
export default ProductOptions;
