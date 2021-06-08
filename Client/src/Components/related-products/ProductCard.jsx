/* eslint-disable import/extensions */
import React from "react";
import PropTypes from "prop-types";
import css from "./styles.css";

function ProductCards({
  product, buttonOnClickEvent, buttonCharacter, onClickEvent,
}) {
  const {
    id, name, category, price, imgUrl, rating,
  } = product;
  console.log(buttonOnClickEvent, buttonOnClickEvent, buttonCharacter);
  return (
    <div className={css.card}>
      {/* <button type="button" onClickEvent={() => buttonOnClickEvent(id)}>
        {buttonCharacter}
      </button> */}
      <div className={css.imgBox} onClick={() => onClickEvent(id)} onKeyUp={() => onClickEvent(id)} role="button" tabIndex="0">
        <img src={imgUrl} alt={name} className={css.cardImage} />
      </div>
      <div className={css.cardDetails}>
        <h3 className={css.thinHeading1}>{category}</h3>
        <h3 className={css.thinHeading2}>{name}</h3>
        <h3 className={css.thinHeading1}>{`$${price}`}</h3>
        <h3 className={css.thinHeading1}>{rating}</h3>
      </div>
    </div>
  );
}
ProductCards.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.number,
    imgUrl: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
  buttonOnClickEvent: PropTypes.func.isRequired,
  onClickEvent: PropTypes.func.isRequired,
  buttonCharacter: PropTypes.string.isRequired,
};
export default ProductCards;
