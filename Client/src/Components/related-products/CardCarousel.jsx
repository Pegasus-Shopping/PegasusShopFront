/* eslint-disable import/extensions */
import PropTypes from "prop-types";
import React from "react";
import css from "./styles.css";
import ProductCard from "./ProductCard.jsx";

function CardCarousel({
  productInfo, title, buttonOnClickEvent, onClickEvent, buttonCharacter = "star",
}) {
  const cardArray = productInfo.map((product, index) => (
    <ProductCard
      product={product}
      key={title + index.toString()}
      buttonOnClickEvent={buttonOnClickEvent}
      onClickEvent={onClickEvent}
      buttonCharacter={buttonCharacter}
    />
  ));
  return (
    <div className={css.carousel}>
      <h3 className={css.thinHeading3}>
        {title}
      </h3>
      {/* <button type="button" className={css.chevronLeft}>
        {"<"}
      </button> */}
      <div className={css.cardContainer}>
        {cardArray}

      </div>
      <button type="button" className={css.chevronRight}>
        &gt;
      </button>
    </div>
  );
}

CardCarousel.propTypes = {
  productInfo: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.string,
    imgUrl: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired).isRequired,
  title: PropTypes.string.isRequired,
  buttonOnClickEvent: PropTypes.func.isRequired,
  onClickEvent: PropTypes.func,
  buttonCharacter: PropTypes.string.isRequired,
};
CardCarousel.defaultProps = {
  onClickEvent: null,
};
export default CardCarousel;
