import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import css from "./styles.css";
import StarList from "../product-reviews/star-rating/StarList";
import RecordClicks from "../RecordClicks";

// input:
// product: type: object with imgUrl, id, name, category, truePrice, ratings properties
// buttonOnClickEvent: type: function, content: callback behavior for clicking on a card's icon
// buttonCharacter: type: string, content: either "star" or "circledX",
// should correspond to icon used in card
// onClickEvent: type: function, content: callback behavior for clicking on a card's image
// output: product card
// side effects: makes api requests
function ProductCard({
  product, buttonOnClickEvent, buttonCharacter, onClickEvent,
}) {
  let buttonClass = "fa fa-star-o";
  if (buttonCharacter === "circledX") {
    buttonClass = "fa fa-times-circle-o";
  }
  const {
    imgUrl, id, name, category, truePrice, ratings,
  } = product;
  // console.log("product", product);
  const widget = "related products comparison";
  return (

    <div className={css.card}>
      <div className={css.cardContents}>
        <RecordClicks widget={widget} element="card button">
          <button type="button" className={css.iconContainer} onClick={() => buttonOnClickEvent(product)}>
            <i className={buttonClass} />
          </button>
        </RecordClicks>
        <RecordClicks widget={widget} element="card body">
          <div className={css.imgBox} onClick={() => onClickEvent(id)} onKeyUp={() => onClickEvent(id)} role="button" tabIndex="0">
            <img
              src={imgUrl}
              alt={name}
              className={css.cardImage}
            />
          </div>
        </RecordClicks>
        <div className={css.cardDetails}>
          <h3 className={css.thinHeading1}>{category.toUpperCase()}</h3>
          <h3 className={css.thinHeading2}>{name}</h3>
          <h3 className={css.thinHeading1}>{`$${truePrice}`}</h3>
          <StarList list={ratings} showAverage={false} />
        </div>
      </div>
    </div>
  );
}
ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    category: PropTypes.string,
    truePrice: PropTypes.string,
    ratings: PropTypes.arrayOf(PropTypes.number),
    imgUrl: PropTypes.string,

  }).isRequired,
  buttonOnClickEvent: PropTypes.func.isRequired,
  onClickEvent: PropTypes.func,
  buttonCharacter: PropTypes.string.isRequired,
};
ProductCard.defaultProps = {
  onClickEvent: () => {},
};
export default ProductCard;
